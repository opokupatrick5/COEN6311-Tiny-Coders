import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { DatePicker, InputNumber } from 'antd';
import moment from "moment";
import api from "../../../services/api";

const { Option } = Select;

const AddEditHotel = ({ visible, onCancel, onFinish, reload, isEdit, hotelData }) => {
  const [form] = Form.useForm(); // Create form instance

  useEffect(() => {
    if (visible && reload) {
      form.resetFields();
    }
    if (isEdit && hotelData) {
      form.setFieldsValue({
        ...hotelData,
        check_in_date: moment(hotelData.check_in_date),
        check_out_date: moment(hotelData.check_out_date)
      }); // Set form fields if editing
    }
  }, [visible, reload, isEdit, hotelData, form]);

  const handleCancel = () => {
    form.resetFields(); // Clear form fields when cancelling
    onCancel(); // Close the modal
  };

  return (
    <Modal
      title={isEdit ? "Edit Hotel" : "Add Hotel"}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} name={isEdit ? "editHotelForm" : "addHotelForm"} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter the Address!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Check in date"
          name="check_in_date"
          rules={[{ required: true, message: 'Please enter the check_in_date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Check out date"
          name="check_out_date"
          rules={[{ required: true, message: 'Please enter the checkout!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the Price!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditHotel;