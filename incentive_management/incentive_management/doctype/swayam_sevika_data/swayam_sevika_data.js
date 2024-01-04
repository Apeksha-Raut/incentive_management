// Copyright (c) 2023, apeksha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Swayam Sevika Data", {
  refresh(frm) {
    if (frappe.user.has_role("BDO & BDE")) {
      console.log("You are BDO & BDE");
    } else if (frappe.user.has_role("System Manager")) {
      console.log("You are Admin");
    } else {
      console.log("sorry insufficient permission");
      frm.disable_form();
      frm.disable_save();

      frappe.set_route("/app/swayam-sevika-management");
      //show_alert with indicator
      frappe.show_alert(
        {
          message: __("Hi, you are not BDO/BDE"),
          indicator: "red",
        },
        5
      );
    }

    // frm.set_df_property('phone_number', 'default', '+91');
    // let phone=frm.doc.phone_number;
    // console.log(phone);

    // Fetch the current date and time
    var currentDate = frappe.datetime.now_date();
    frm.set_value("entry_date", currentDate);
    console.log(currentDate);

    if (frm.is_new()) {
      //Setting Employee ID
      let user = frappe.session.user;
      let eid = user.match(/\d+/)[0];
      frm.set_value("employee_id", eid);
    }
    //CSS for custom save button
    frm.fields_dict.save_btn.$input.css({
      "background-color": "#5890FF",
      color: "#fff",
      border: "none",
      padding: "8px 22px",
      cursor: "pointer",
    });

    let empid = frm.doc.employee_id;
    // Check if the current user's ID is 26
    if (empid === "26") {
      // Add custom button for Approval
      frm
        .add_custom_button(__("Approve"), function () {
          frm.set_value("status", "Approved");
          frm.refresh_field("status");
          console.log("Approved");
          frm.save();
        })
        .css({
          "background-color": "#28a745", // Set green color
          color: "#ffffff", // Set font color to white
        });

      // Add custom button for Rejection
      frm
        .add_custom_button(__("Reject"), function () {
          frm.set_value("status", "Rejected");
          frm.refresh_field("status");
          console.log("Reject");
          frm.save();
        })
        .css({
          "background-color": "#dc3545", // Set red color
          color: "#ffffff", // Set font color to white
        });
    }

    //check if form is old then execute following code
    if (!frm.is_new()) {
      // frm.disable_save();
      frm.toggle_display("save_btn", false);
    }
  },

  before_save: function (frm) {
    // Fetch the current date and time
    var currentDate = frappe.datetime.now_date();
    frm.set_value("entry_date", currentDate);
    console.log(currentDate);
  },

  // check the present and permanent address is same or not
  address_check_same: function (frm) {
    let addressCheckValue = frm.doc.address_check_same;
    console.log(addressCheckValue);
    if (addressCheckValue == "1") {
      frm.toggle_display("permanent_address", false);
      console.log("permanent address field is hide..");
      frm.set_value("permanent_address", frm.doc.present_address);
      frm.refresh_field("permanent_address");
      console.log(frm.doc.permanent_address);
    } else {
      frm.toggle_display("permanent_address", true);
      console.log("permanent address field is visible..");
      frm.set_value("permanent_address", null);
      frm.refresh_field("permanent_address");
    }
  },

  save_btn: function (frm) {
    //Taking values from doctype fields
    let ssCode = frm.doc.ss_code;
    let date = frm.doc.entry_date;
    let firstName = frm.doc.first_name;
    let middleName = frm.doc.middle_name;
    let lastName = frm.doc.last_name;

    let phoneNo = frm.doc.phone;
    let birthDate = frm.doc.date_of_birth;
    let panNo = frm.doc.pan_number;
    let aadharNo = frm.doc.aadhar_number;
    let gender = frm.doc.gender;
    let highEdu = frm.doc.highest_education;

    let presentAdd = frm.doc.present_address;
    //let permanentAdd = frm.doc.permanent_address;

    //checking the empty values
    if (!ssCode) {
      frappe.throw("Please Enter your SS Code");
    } else if (!firstName) {
      frappe.throw("Please Enter your First Name");
    } else if (!middleName) {
      frappe.throw("Please Enter your Middle Name");
    } else if (!lastName) {
      frappe.throw("Please Enter your Last Name");
    } else if (!phoneNo) {
      frappe.throw("Please Enter your Phone Number");
    } else if (!birthDate) {
      frappe.throw("Please Enter your Date of Birth");
    } else if (!presentAdd) {
      frappe.throw("Please Enter your Address");
    } else if (!gender) {
      frappe.throw("Please Enter your Gender");
    } else if (!highEdu) {
      frappe.throw("Please Enter your Higher Education");
    } else {
      frm.save();
    }
    // frm.set_value("ss_code", null);
    // frm.set_value("first_name", null);
    // frm.set_value("middle_name", null);
    // frm.set_value("last_name", null);
    // frm.set_value("phone", null);
    // frm.set_value("pan_number", null);
    // frm.set_value("aadhar_number", null);
    // frm.set_value("gender", null);
    // frm.set_value("highest_education", null);
    // frm.set_value("present_address", null);
    // frm.set_value("permanent_address", null);
    // frm.set_value("date_of_birth", null);
    // frm.set_value("address_check_same", null);
    // frm.refresh_field();
  },
  // // add button to save data into child table
  // add_btn: function (frm) {
  //   //Taking values from doctype fields
  //   let ssCode = frm.doc.ss_code;
  //   let date = frm.doc.entry_date;
  //   let firstName = frm.doc.first_name;
  //   let middleName = frm.doc.middle_name;
  //   let lastName = frm.doc.last_name;

  //   let phoneNo = frm.doc.phone_number;
  //   let birthDate = frm.doc.date_of_birth;
  //   let panNo = frm.doc.pan_number;
  //   let aadharNo = frm.doc.aadhar_number;
  //   let gender = frm.doc.gender;
  //   let highEdu = frm.doc.highest_education;

  //   let presentAdd = frm.doc.present_address;
  //   let permanentAdd = frm.doc.permanent_address;

  //   //checking the empty values
  //   if (!ssCode) {
  //     frappe.throw("Please Enter your SS Code");
  //   } else if (!firstName) {
  //     frappe.throw("Please Enter your First Name");
  //   } else if (!lastName) {
  //     frappe.throw("Please Enter your Last Name");
  //   } else if (!phoneNo) {
  //     frappe.throw("Please Enter your Phone Number");
  //   } else if (!birthDate) {
  //     frappe.throw("Please Enter your Date of Birth");
  //   } else if (!aadharNo) {
  //     frappe.throw("Please Enter your Aadhar Number");
  //   } else if (!presentAdd) {
  //     frappe.throw("Please Enter your Address");
  //   } else if (!gender) {
  //     frappe.throw("Please Enter your Gender");
  //   } else if (!highEdu) {
  //     frappe.throw("Please Enter your Higher Education");
  //   } else {
  //     // adding data to child table name SS_Data
  //     let row = frm.add_child("ss_data", {
  //       ss_code: ssCode,
  //       ss_date: date,
  //       first_name: firstName,
  //       middle_name: middleName,
  //       last_name: lastName,
  //       phone_number: phoneNo,
  //       date_of_birth: birthDate,
  //       gender: gender,
  //       pan_number: panNo,
  //       aadhar_number: aadharNo,
  //       highest_education: highEdu,
  //       present_address: presentAdd,
  //       permanent_address: permanentAdd,
  //     });
  //     frm.refresh_field("ss_data");
  //     frm.save(); // save the form

  //     //after save form the doctype fields will be null
  //     frm.set_value("ss_code", null);
  //     frm.set_value("first_name", null);
  //     frm.set_value("middle_name", null);
  //     frm.set_value("last_name", null);
  //     frm.set_value("phone_number", null);
  //     frm.set_value("pan_number", null);
  //     frm.set_value("aadhar_number", null);
  //     frm.set_value("gender", null);
  //     frm.set_value("highest_education", null);
  //     frm.set_value("present_address", null);
  //     frm.set_value("permanent_address", null);
  //     frm.set_value("date_of_birth", null);
  //     frm.set_value("address_check_same", null);
  //   }
  // },
});
