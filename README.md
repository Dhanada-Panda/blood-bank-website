# Blood Bank Management System

## Introduction

The **Blood Bank Management System** is a web-based application that facilitates the efficient management of blood donations, inventory, and distribution. The system connects donors, organizations, hospitals, and admins to streamline the process of donating, storing, and utilizing blood effectively. The goal is to ensure timely access to blood for those in need while maintaining accurate records and inventory.

---

## Features

### User Roles and Dashboards:
1. **Admin:**
   - Sign up and sign in as an admin.
  
   - ![Screenshot (213)](https://github.com/user-attachments/assets/24c9afba-328b-437c-952f-fe3c407ce6c4)

   - View a comprehensive list of donors, organizations, and hospitals.
  
   - ![Screenshot (214)](https://github.com/user-attachments/assets/463d1167-9df8-48ba-bc3f-836fe07b48c6)
  
   ![Screenshot (215)](https://github.com/user-attachments/assets/2431c7cb-95a3-43c4-b72e-419fa3031d89)


     ![Screenshot (216)](https://github.com/user-attachments/assets/8daf06d7-cef2-4cff-8115-90fededccf50)


   - Update or delete user accounts (donors, organizations, hospitals).
   - Manage blood inventory across all organizations and hospitals.
   - Monitor system-wide statistics, including blood availability and user activity.

3. **Donor:**
   - Sign up and sign in as a donor.
   - Donate blood to an organization or hospital.
  
   - ![Screenshot (217)](https://github.com/user-attachments/assets/26b0f11f-ab8d-433b-a8bf-c35a9692a6c1)
  
   - ![Screenshot (218)](https://github.com/user-attachments/assets/44051fb0-d727-4673-bc8c-e084cea37b64)


   - View and manage their donation history in their personalized dashboard.
   - Receive reminders for future donation eligibility.

4. **Organization:**
   - Sign up and sign in as an organization.
  
   - ![Screenshot (227)](https://github.com/user-attachments/assets/fa330100-b984-4aa9-ae6e-2e6affd9ad4f)
  
   - ![Screenshot (222)](https://github.com/user-attachments/assets/ae08ceaf-80d1-4108-b2d9-34769b8b46cc)

   - View the list of donors who have donated blood to the organization.
  
   - ![Screenshot (223)](https://github.com/user-attachments/assets/8bfec742-ea7d-4491-a7b9-37eaa01c659a)

   - View the list of hospitals that have collected blood from the organization.
  
   ![Screenshot (224)](https://github.com/user-attachments/assets/3e772b62-6601-4c3e-bd63-7ea18ebefc92)

   - Manage inventory and generate reports of blood donation activities.
  
   - 
![Screenshot (226)](https://github.com/user-attachments/assets/4d7dc7f9-7d6d-4a90-81c0-44df1ca09494)

6. **Hospital:**
   - Sign up and sign in as a hospital.
   - View details of donors and organizations from which they have collected blood.
  
   - ![Screenshot (219)](https://github.com/user-attachments/assets/35d40663-5318-4a93-b66d-e5ee64741c4b)
  
   - 
![Screenshot (220)](https://github.com/user-attachments/assets/ff45ced7-4e4b-47ef-991b-f8d75441ce02)


![Screenshot (221)](https://github.com/user-attachments/assets/85f66c64-b0a8-4b79-bbab-f4ee3777b786)

   - Manage blood usage and track inventory.
   - View donation history and generate reports for auditing purposes.

---

## Core Functionalities

- **Sign Up and Sign In:** 
  - Secure sign-up and login functionality for all roles: Admin, Donor, Organization, and Hospital.
  - Role-based redirection to respective dashboards upon successful login.

- **Admin Features:**
  - View, update, or delete user accounts (Donors, Organizations, Hospitals).
  - Monitor blood inventory and ensure adequate stock across the system.
  - Comprehensive dashboard showing system statistics.

- **Donor Features:**
  - Schedule blood donations to a selected organization or hospital.
  - View donation history and upcoming donation reminders.
  - Check donation eligibility based on the last donation date.

- **Organization Features:**
  - Track all donations made to the organization by donors.
  - Manage inventory and ensure blood availability for hospitals.
  - View hospitals that have collected blood from the organization.

- **Hospital Features:**
  - Track the sources (donors or organizations) of collected blood.
  - Manage blood usage and maintain records for auditing.
  - Generate detailed reports for inventory and donation history.

---

## Tech Stack

- **Frontend:**
  - React.js
  - Bootstrap for responsive design and styling
  - Axios for API integration
  - FontAwesome icons for enhanced user experience

- **Backend:**
  - Node.js with Express.js for server-side logic
  - MongoDB for database management

- **Other Tools:**
  - Postman for API testing
  - Git for version control

---

## Installation

### Prerequisites

Ensure the following are installed:
- Node.js (v14 or higher)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- Git

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Dhanada-Panda/blood-bank-website.git
