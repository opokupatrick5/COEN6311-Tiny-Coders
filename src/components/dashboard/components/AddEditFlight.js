import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { DatePicker, InputNumber } from 'antd';
import moment from "moment";
import api from "../../../services/api";

const { Option } = Select;

const AddFlight = ({ visible, onCancel, onFinish, reload, isEdit, flightData }) => {
  const [form] = Form.useForm(); // Create form instance

  useEffect(() => {
    if (visible && reload) {
      form.resetFields();
    }
    if (isEdit && flightData) {
      form.setFieldsValue({
        ...flightData,
        departure_date: moment(flightData.departure_date),
        return_date: moment(flightData.return_date)
      }); // Set form fields if editing
    }
  }, [visible, reload, isEdit, flightData, form]);

  const handleCancel = () => {
    form.resetFields(); // Clear form fields when cancelling
    onCancel(); // Close the modal
  };

  return (
    <Modal
      title={isEdit ? "Edit Flight" : "Add Flight"}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} name={isEdit ? "editFlightForm" : "addFlightForm"} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Airline"
          name="airline"
          rules={[{ required: true, message: 'Please enter the airline!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Departure airport"
          name="departure_airport"
          rules={[{ required: true, message: 'Please enter the Departure airport!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Destination airport"
          name="destination_airport"
          rules={[{ required: true, message: 'Please enter the Destination airport!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Departure date"
          name="departure_date"
          rules={[{ required: true, message: 'Please enter the Departure date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Return date"
          name="return_date"
          rules={[{ required: true, message: 'Please enter the Return date!' }]}
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

export default AddFlight;