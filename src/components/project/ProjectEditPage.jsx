import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Upload, Button, InputNumber, message, Typography as AntTypography, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AppBar, Toolbar, Typography as MuiTypography, Box } from '@mui/material';
import FileItem from '../common/FileItem';
import Loading from '../common/Loading';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;
const { Title } = AntTypography;


const ProjectEditPage = () => {
  const [form] = Form.useForm();
  const [project, setProject] = useState([]);
  const[loading, setLoading] = useState(true);
  const[agreementLinks, setAgreementLinks] = useState([]);
  const[deletedAgreementLinks, setDeletedAgreementLinks] = useState([]);
  const[billLinks, setBillLinks] = useState([]);
  const [deletedBillLinks, setDeletedBillLinks] = useState([]);

  const { projectId } = useParams();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formDataToSubmit = new FormData();
      const userEmail = localStorage.getItem('email');
      formDataToSubmit.append('email', userEmail);
      agreementLinks.forEach(link => formDataToSubmit.append('undeleted_agreement', link));
      billLinks.forEach(link => formDataToSubmit.append('undeleted_billSettlement', link));
      deletedAgreementLinks.forEach(link => formDataToSubmit.append('deleted_agreement', link));
      deletedBillLinks.forEach(link => formDataToSubmit.append('deleted_billSettlement', link));

      Object.keys(values).forEach(key => {
        if (key === 'projectDuration') {
          const [start, end] = values[key];
          formDataToSubmit.append(key, `${start.format('DD MMMM YYYY')} - ${end.format('DD MMMM YYYY')}`);
        } else if (key === 'billSettlement' || key === 'agreement') {
          if (values[key]?.fileList?.length > 0) {
            values[key].fileList.forEach((file) => {
              if (!file.url) formDataToSubmit.append(`${key}`, file.originFileObj);
            });
          }
        } else {
          formDataToSubmit.append(key, values[key]);
        }
      });

      const response = await axios.put('http://localhost:5000/project/update/'+projectId, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        message.success('Project details submitted successfully!');
        setLoading(false);
        form.resetFields();
        navigate('/');
      }
    } catch (error) {
      message.error('Failed to submit project details');

      console.error('Submission error:', error);
      setLoading(false);
    } finally {

    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        message.error('You can only upload PDF files!');
      }
      return isPDF || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed`);
      }
    },
    customRequest: ({ onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
    multiple: true
  };

  const yearOptions = Array.from({ length: 101 }, (_, i) => ({
    value: `${2000 + i}-${2001 + i}`,
    label: `${2000 + i}-${2001 + i}`
  }));
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get('http://localhost:5000/project/fetch/project/' + projectId);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    fetchProject();
    }, [projectId]); 
    
    useEffect(() => {
    if (project && Object.keys(project).length > 0) {
      form.setFieldsValue({
        industryName: project.industryName,
        projectTitle: project.projectTitle,
        principalInvestigator: project.principalInvestigator,
        coPrincipalInvestigator: project.coPrincipalInvestigator,
        academicYear: project.academicYear,
        amountSanctioned: project.amountSanctioned,
        amountReceived: project.amountReceived,
        studentDetails: project.studentDetails,
        projectSummary: project.projectSummary,
      });
    }
    if (project?.projectDuration) {
      const [startStr, endStr] = project.projectDuration.split(' - ');
      const startDate = dayjs(startStr, 'DD MMMM YYYY');
      const endDate = dayjs(endStr, 'DD MMMM YYYY');

      form.setFieldsValue({
        projectDuration: [startDate, endDate]
      });
    }
    if (project?.billSettlement) {
      setBillLinks(project.billSettlement.split(',').map(link => link.trim())); 
    }
    if (project?.agreement) {
      setAgreementLinks(project.agreement.split(',').map(link => link.trim())); 
    }
    setLoading(false);
  }, [project, form]); 

  if(loading) return (
  <Box sx={{margin: '40px'}}>
    <Loading />
  </Box>);
  return (
    <>
      <AppBar position="static" sx={{
        backgroundColor: '#000000',
        mb: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <Toolbar sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <MuiTypography
            variant="h6"
            sx={{
              fontSize: '24px',
              fontWeight: 500,
              letterSpacing: '0.5px',
              background: 'linear-gradient(45deg, #fff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {project.projectTitle || ''}
          </MuiTypography>
        </Toolbar>
      </AppBar>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{
          maxWidth: 1000,
          margin: '3rem auto',
          padding: '50px 60px',
          background: 'linear-gradient(145deg, #ffffff, #fafafa)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        }}
      >
        <Title
          level={2}
          style={{
            marginBottom: '50px',
            textAlign: 'center',
            fontSize: '36px',
            fontWeight: 600,
            color: '#1a1a1a',
            position: 'relative',
            paddingBottom: '20px',
            fontFamily: 'system-ui'
          }}
        >
          Edit Project Details
          <div style={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #000000, #404040)',
            borderRadius: '4px'
          }} />
        </Title>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <Form.Item
            name="industryName"
            label="Industry Name"
            rules={[{ required: true, message: 'Please enter industry name' }]}
          >
            <Input
              size="large"
              style={{
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '15px',
                border: '1px solid #e8e8e8',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                transition: 'all 0.3s ease',
              }}
            />
          </Form.Item>


          <Form.Item
            name="projectDuration"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Duration of Project</span>}
            rules={[{ required: true, message: 'Please select project duration' }]}
          >
            <DatePicker.RangePicker
              size="large"
              style={{
                width: '100%',
                borderRadius: '10px',
                padding: '12px 16px',
                border: '1px solid #e8e8e8',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
              }}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="projectTitle"
          label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Title of Project</span>}
          rules={[{ required: true, message: 'Please enter project title' }]}
        >
          <Input
            size="large"
            style={{
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '15px',
              border: '1px solid #e8e8e8',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              transition: 'all 0.3s ease'
            }}
          />
        </Form.Item>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <Form.Item
            name="principalInvestigator"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Principal Investigator (PI)</span>}
            rules={[{ required: true, message: 'Please enter PI details' }]}
          >
            <Input
              size="large"
              style={{
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '15px',
                border: '1px solid #e8e8e8',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                transition: 'all 0.3s ease'
              }}
            />
          </Form.Item>

          <Form.Item
            name="coPrincipalInvestigator"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Co-Principal Investigator (Co-PI)</span>}
            rules={[{ required: true, message: 'Please enter Co-PI details' }]}
          >
            <Input
              size="large"
              style={{
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '15px',
                border: '1px solid #e8e8e8',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                transition: 'all 0.3s ease'
              }}
            />
          </Form.Item>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <Form.Item
            name="academicYear"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Academic Year</span>}
            rules={[{ required: true, message: 'Please select academic year' }]}
            initialValue="2025-2026"
          >
            <Select
              size="large"
              placeholder="Select Academic Year"
              options={yearOptions}
              defaultValue="2025-2026"
              style={{
                width: '100%',
                borderRadius: '10px',
                fontSize: '15px',
              }}
            />
          </Form.Item>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          <Form.Item
            name="amountSanctioned"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Amount Sanctioned</span>}
            rules={[{ required: true, message: 'Please enter sanctioned amount' }]}
          >
            <InputNumber
              size="large"
              style={{
                width: '100%',
                borderRadius: '10px',
                padding: '8px 16px',
                fontSize: '15px',
                border: '1px solid #e8e8e8',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/₹\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="amountReceived"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Amount Received</span>}
            rules={[{ required: true, message: 'Please enter received amount' }]}
          >
            <InputNumber
              size="large"
              style={{
                width: '100%',
                borderRadius: '10px',
                padding: '8px 16px',
                fontSize: '15px',
                border: '1px solid #e8e8e8',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              }}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/₹\s?|(,*)/g, '')}
            />
          </Form.Item>
        </div>

        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '30px'
          }}>
          <Form.Item
            name="billSettlement"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Bill Settlement Details</span>}
            
          >
            <Upload {...uploadProps}>
              <Button
                icon={<UploadOutlined />}
                size="large"
                style={{
                  width: '100%',
                  height: '45px',
                  borderRadius: '10px',
                  border: '1px dashed #d9d9d9',
                  background: '#fafafa',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                Upload PDF
              </Button>
            </Upload>
            
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {billLinks.map((link, index) => (
              <FileItem
                key={index}
                href={link}
                onDelete={() => {
                  setDeletedBillLinks((prev) => [...prev, link]);
                  setBillLinks((prev) => prev.filter((item) => item !== link)); 
                }}
              />
            ))}
          </div>
          </div><div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '30px'
          }}>
          <Form.Item
            name="agreement"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Signed Agreement Document</span>}
            
          >
            <Upload {...uploadProps}>
              <Button
                icon={<UploadOutlined />}
                size="large"
                style={{
                  width: '100%',
                  height: '45px',
                  borderRadius: '10px',
                  border: '1px dashed #d9d9d9',
                  background: '#fafafa',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                Upload PDF
              </Button>
            </Upload>
          </Form.Item>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {
              agreementLinks.map((link, index) => (
                <FileItem
                  key={index}
                  href={link}
                  onDelete={() => {
                    setDeletedAgreementLinks((prev) => [...prev, link]);
                    setAgreementLinks((prev) => prev.filter((item) => item !== link)); 
                  }}
                />
              ))
          }
          </div>
        </div>
        </div>
        <Form.Item
          name="studentDetails"
          label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Student Details</span>}
        >
          <TextArea
            rows={4}
            placeholder="Enter details of students involved in the project"
            style={{
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '15px',
              border: '1px solid #e8e8e8',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              resize: 'vertical'
            }}
          />
        </Form.Item>

        <Form.Item
          name="projectSummary"
          label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Project Summary</span>}
          rules={[
            { max: 100, message: 'Summary should not exceed 100 words' }
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Enter project summary (max 100 words)"
            style={{
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '15px',
              border: '1px solid #e8e8e8',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
              resize: 'vertical'
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{
              width: '100%',
              height: '50px',
              fontSize: '16px',
              fontWeight: 500,
              background: '#000000',
              border: 'none',
              borderRadius: '8px',
              marginTop: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            Update Project
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectEditPage;
