const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, donoremail, bloodGroup, quantity } = req.body;

    // Find the user making the request
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // Role-specific validation for "out" inventory
    if (inventoryType === "out") {
      if (!donoremail) {
        return res.status(400).send({
          success: false,
          message: "Hospital email is required for inventory type 'out'.",
        });
      }

      // Validate the hospital email
      const hospital = await userModel.findOne({ email: donoremail, role: "hospital" });
      if (!hospital) {
        return res.status(400).send({
          success: false,
          message: "Invalid hospital email. Hospital not found or not registered.",
        });
      }

      // Calculate available blood quantity
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

      const availableQuantity = totalIn - totalOut;

      if (availableQuantity < quantity) {
        return res.status(400).send({
          success: false,
          message: `Only ${availableQuantity}ML of ${bloodGroup.toUpperCase()} is available.`,
        });
      }

      // Assign hospital details to the inventory record
      req.body.hospital = hospital._id; // Save the hospital's ID
      req.body.hospitalEmail = hospital.email; // Save the hospital's email
    } else if (inventoryType === "in") {
      // Validation for "in" inventory type (e.g., from a donor)
      if (!donoremail) {
        return res.status(400).send({
          success: false,
          message: "Donor email is required for inventory type 'in'.",
        });
      }

      // Validate donor email
      const donor = await userModel.findOne({ email: donoremail, role: "donor" });
      if (!donor) {
        return res.status(400).send({
          success: false,
          message: "Invalid donor email. Donor not found or not registered.",
        });
      }

      req.body.donor = donor._id; // Save donor's ID
      req.body.donoremail = donor.email; // Save donor's email
    } else {
      return res.status(400).send({
        success: false,
        message: "Invalid inventory type. Must be 'in' or 'out'.",
      });
    }

    // Save inventory record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventory API.",
      error: error.message,
    });
  }
};




// GET ALL BLOOD RECORS

const getInventoryController = async (req, res) => {
  try {
    //const organisation = new mongoose.Types.ObjectId(req.body.userId); // Ensure the ID is cast to ObjectId
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId, // Match organisation as ObjectId
      })
      .populate("donor", "name email")
      .populate("hospital", "name address")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};

// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// GET DONAR REOCRDS
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donars
    const donorId = await inventoryModel.distinct("donor", {
      organisation,
    });
    // console.log(donorId);
    const donors = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// GET ORG PROFILES
const getOrgnaisationController = async (req, res) => {
  try {
    const donor = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donor });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};
// GET ORG for Hospital
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};