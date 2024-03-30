import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Skeleton, message } from "antd";
import AddPackageForm from "./components/AddPackageForm";
import EditPackageForm from "./components/EditPackageForm";
import ActionButtons from "./components/ActionButtons";
import api from "../../services/api";

const { confirm } = Modal;

const PackageList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState({})
  const [reload, setReload] = useState(0)

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await api.get("packages/");
      setPackages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setLoading(false);
      message.error("Failed to fetch packages. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPackages();
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      title: "Package Details",
      content: (
        <div>
          <p>
            <strong>ID:</strong> {record.id}
          </p>
          <p>
            <strong>Name:</strong> {record.name}
          </p>
          <p>
            <strong>Description:</strong> {record.description}
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  const handleEdit = (record) => {
    setIsEditModalVisible(true)
    setSelectedPackage(record)
    // Implement edit functionality
    console.log("Edit package:", record);
  };

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Are you sure delete this package?",
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

  const handleAddPackage = async (values) => {
    try {
      const { flights, hotels, activities, ...rest } = values;
      const requestBody = {
      ...rest,
      user: 2, // Assuming user ID is 2
      flights: flights,
      hotels: hotels,
      activities: activities,
    };

    const response = await api.post('packages/add/', requestBody);
      message.success('Package added successfully!');
      fetchPackages();
      handleCancel()
      setReload(reload + 1);
    } catch (error) {
      console.error('Error adding package:', error);
      message.error('Failed to add package. Please try again later.');
    }
  };

  const handleEditPackage = async (values) => {
    try {
      const { flights, hotels, activities, ...rest } = values;
      const requestBody = {
      ...rest,
      user: 2, // Assuming user ID is 2
      flights: flights,
      hotels: hotels,
      activities: activities,
    };

    const response = await api.put(`packages/update/${selectedPackage.id}/`, requestBody);
      message.success('Package updated successfully!');
      fetchPackages();
      handleCancelEdit()
      setReload(reload + 1);
    } catch (error) {
      console.error('Error adding package:', error);
      message.error('Failed to updating package. Please try again later.');
    }
  };

  return (
    <div>
      <div style={{display: "flex", justifyContent:"flex-end"}}>
      <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
        Add Package
      </Button>
      </div>
      <Skeleton loading={loading} active>
        <Table columns={columns} dataSource={packages} rowKey="id" />
      </Skeleton>
      <AddPackageForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onFinish={handleAddPackage}
        reload={reload}
      />
       <EditPackageForm
        visible={isEditModalVisible}
        onCancel={handleCancelEdit}
        onFinish={handleEditPackage}
        reload={reload}
        initialValues={selectedPackage}
      />
    </div>
  );
};

export default PackageList;
