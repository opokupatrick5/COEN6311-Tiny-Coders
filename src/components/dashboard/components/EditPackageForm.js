import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import api from "../../../services/api";

const { Option } = Select;

const EditPackageForm = ({ visible, onCancel, onFinish, reload, initialValues }) => {
  const [form] = Form.useForm(); // Create form instance

  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [activities, setActivities] = useState([]);
  const selectedActivity = initialValues.activities?.map((activity) => activity.id)
  console.log("selectedActivity", selectedActivity)
  const [selectedFlights, setSelectedFlights] = useState([]);

  const handleFlightSelect = (value) => {
    setSelectedFlights(value);
  };
  useEffect(() => {
    if (visible && reload) {
       form.resetFields();
    }
  }, [visible, reload]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get('flights/');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
        message.error('Failed to fetch flights. Please try again later.');
      }
    };

    const fetchHotels = async () => {
      try {
        const response = await api.get('hotels/');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        message.error('Failed to fetch hotels. Please try again later.');
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await api.get('activities/');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        message.error('Failed to fetch activities. Please try again later.');
      }
    };

    fetchFlights();
    fetchHotels();
    fetchActivities();
  }, []);


  const handleCancel = () => {
    form.resetFields(); // Clear form fields when cancelling
    onCancel(); // Close the modal
  };
  const defaultSelected = [1, 4];
  return (
    <Modal
      title={"Edit Package"}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} name="editPackageForm" onFinish={onFinish} layout="vertical" initialValues={initialValues}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the description!' }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Select Hotel"
          name="hotels"
          rules={[{ required: true, message: 'Please select a hotel!' }]}
        >
          <Select mode="multiple" value={initialValues.hotels}>
            {hotels.map((hotel) => (
              <Option key={hotel.id} value={hotel.id}>{hotel.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select Flight"
          name="flights"
          rules={[{ required: true, message: 'Please select a flight!' }]}
        >
          <Select mode="multiple" value={["1","2"]}>
            {flights.map((flight) => (
              <Option  key={flight.id} value={flight.id}>{flight.airline} - {flight.departure_airport} to {flight.destination_airport}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Select Activity"
          name="activities"
          rules={[{ required: true, message: 'Please select an activity!' }]}
        >
          <Select mode="multiple">
            {activities.map((activity) => (
              <Option key={activity.id} value={activity.id}>{activity.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {"Update"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPackageForm;