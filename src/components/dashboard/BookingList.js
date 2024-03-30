import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Skeleton, message } from "antd";
import AddEditFlight from "./components/AddEditFlight";
import EditPackageForm from "./components/EditPackageForm";
import ActionButtons from "./components/ActionButtons";
import api from "../../services/api";
import moment from "moment";

const { confirm } = Modal;

const BookingList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null)
  const [reload, setReload] = useState(0)

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("flights/");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setLoading(false);
      message.error("Failed to fetch packages. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Airline",
      dataIndex: "airline",
      key: "airline",
    },
    {
      title: "Departure airport",
      dataIndex: "departure_airport",
      key: "departure_airport",
    },
    {
      title: "Destination airport",
      dataIndex: "destination_airport",
      key: "destination_airport",
    },
    {
      title: "Departure date",
      dataIndex: "departure_date",
      key: "departure_date",
    },
    {
      title: "Return date",
      dataIndex: "return_date",
      key: "return_date",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <ActionButtons
          onView={() => handleView(record)}
          onEdit={() => handleEdit(record)}
          onDelete={() => showDeleteConfirm(record)}
        />
      ),
    },
  ];

  const handleView = (record) => {
    Modal.info({
      title: "Flight Details",
      content: (
        <div>
          <p>
            <strong>ID:</strong> {record.id}
          </p>
          <p>
            <strong>Airline:</strong> {record.airline}
          </p>
          <p>
            <strong>Departure airport:</strong> {record.departure_airport}
          </p>
          <p>
            <strong>Destination airport:</strong> {record.destination_airport}
          </p>
          <p>
            <strong>Return date:</strong> {record.return_date}
          </p>
          <p>
            <strong>Price:</strong> {record.price}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleEdit = (record) => {
    setSelectedData(record)
    setIsModalVisible(true);
    setIsEdit(true)
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this flight?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = (record) => {
    // Implement delete functionality
    console.log("Delete package:", record);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleAdd = async (values) => {
    try {
      const { return_date, departure_date, ...rest } = values;
      const requestBody = {
      ...rest,
      return_date: moment(return_date).format('YYYY-MM-DD'),
      departure_date: moment(departure_date).format('YYYY-MM-DD'),
    };
    const response = await api.post('flights/', requestBody);
      message.success('flight added successfully!');
      fetchData()
      handleCancel()
      setReload(reload + 1);
    } catch (error) {
      console.error('Error adding package:', error);
      message.error('Failed to add package. Please try again later.');
    }
  };

  const handleUpdate = async (values) => {
    try {
      const { return_date, departure_date, ...rest } = values;
      const requestBody = {
      ...rest,
      return_date: moment(return_date).format('YYYY-MM-DD'),
      departure_date: moment(departure_date).format('YYYY-MM-DD'),
    };
    const response = await api.put(`flights/${selectedData.id}/`, requestBody);
      message.success('flight added successfully!');
      fetchData()
      handleCancel()
      setReload(reload + 1);
    } catch (error) {
      console.error('Error adding package:', error);
      message.error('Failed to add package. Please try again later.');
    }
  };

  return (
    <div>
     <p>Coming Soon</p>
    </div>
  );
};

export default BookingList;
