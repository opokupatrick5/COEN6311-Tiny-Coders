import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Skeleton, message } from "antd";
import AddEditHotel from "./components/AddEditHotel";
import ActionButtons from "./components/ActionButtons";
import api from "../../services/api";
import moment from "moment";

const { confirm } = Modal;

const HotelList = () => {
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
      const response = await api.get("hotels/");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setLoading(false);
      message.error("Failed to fetch hotels. Please try again later.");
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Checkin date",
      dataIndex: "check_in_date",
      key: "checkin_in_date",
    },
    {
      title: "checkin Out date",
      dataIndex: "check_out_date",
      key: "checkin_out_date",
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
          // onDelete={() => showDeleteConfirm(record)}
        />
      ),
    },
  ];

  const handleView = (record) => {
    Modal.info({
      title: "Hotel Details",
      content: (
        <div>
          <p>
            <strong>ID:</strong> {record.id}
          </p>
          <p>
            <strong>Name:</strong> {record.name}
          </p>
          <p>
            <strong>Address:</strong> {record.address}
          </p>
          <p>
            <strong>Checkin date:</strong> {record.check_in_date}
          </p>
          <p>
            <strong>Checkout date:</strong> {record.check_out_date}
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
    console.log("record", record)
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
    setIsEdit(false)
    setIsModalVisible(false);
  };
  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleAdd = async (values) => {
    try {
      const { check_in_date, check_out_date, ...rest } = values;
      const requestBody = {
      ...rest,
      check_in_date: moment(check_in_date).format('YYYY-MM-DD'),
      check_out_date: moment(check_out_date).format('YYYY-MM-DD'),
    };
    const response = await api.post('hotels/', requestBody);
      message.success('Hotel added successfully!');
      fetchData()
      handleCancel()
      setReload(reload + 1);
    } catch (error) {
      console.error('Error adding hotel:', error);
      message.error('Failed to add hotel. Please try again later.');
    }
  };

  const handleUpdate = async (values) => {
    try {
      const { check_in_date, check_out_date, ...rest } = values;
      const requestBody = {
      ...rest,
      check_in_date: moment(check_in_date).format('YYYY-MM-DD'),
      check_out_date: moment(check_out_date).format('YYYY-MM-DD'),
    };
    const response = await api.put(`hotels/${selectedData.id}/`, requestBody);
      message.success('hotels updated successfully!');
      fetchData()
      handleCancel()
      setReload(reload + 1);
    } catch (error) {
      console.error('Error updating hotels:', error);
      message.error('Failed to update hotels. Please try again later.');
    }
  };

  return (
    <div>
      <div style={{display: "flex", justifyContent:"flex-end"}}>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Hotel
      </Button>
      </div>
      <Skeleton loading={loading} active>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Skeleton>
      <AddEditHotel
        visible={isModalVisible}
        onCancel={handleCancel}
        onFinish={isEdit ? handleUpdate : handleAdd}
        reload={reload}
        isEdit={isEdit}
        hotelData={selectedData}
      />
    </div>
  );
};

export default HotelList;
