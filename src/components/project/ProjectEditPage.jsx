import React from 'react';
import { Form, Input, DatePicker, Upload, Button, InputNumber, message, Typography as AntTypography, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AppBar, Toolbar, Typography as MuiTypography } from '@mui/material';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = AntTypography;

const ProjectEditPage = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const formDataToSubmit = new FormData();
      
      const userEmail = localStorage.getItem('email');
      formDataToSubmit.append('email', userEmail);
      
      Object.keys(values).forEach(key => {
        if (key === 'projectDuration') {
          const [start, end] = values[key];
          formDataToSubmit.append(key, `${start.format('MMM YYYY')} - ${end.format('MMM YYYY')}`);
        } else if (key === 'billSettlement' || key === 'agreement') {
          if (values[key]?.fileList?.length > 0) {
            values[key].fileList.forEach((file) => {
              formDataToSubmit.append(`${key}`, file.originFileObj);
            });
          }
        } else {
          formDataToSubmit.append(key, values[key]);
        }
      });

      const response = await axios.post('http://localhost:5000/project/submit', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        message.success('Project details submitted successfully!');
        form.resetFields();
      }
    } catch (error) {
      message.error('Failed to submit project details');
      console.error('Submission error:', error);
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
    multiple: true
  };

  const yearOptions = Array.from({ length: 101 }, (_, i) => ({
    value: `${2000 + i}-${2001 + i}`,
    label: `${2000 + i}-${2001 + i}`
  }));

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
                New Project
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
          Project Details
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
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Industry Name</span>}
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
                transition: 'all 0.3s ease'
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

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '30px',
          marginBottom: '30px' 
        }}>
          <Form.Item
            name="billSettlement"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Bill Settlement Details</span>}
            rules={[{ required: true, message: 'Please upload bill settlement details' }]}
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

          <Form.Item
            name="agreement"
            label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Signed Agreement Document</span>}
            rules={[{ required: true, message: 'Please upload signed agreement' }]}
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
        </div>

        <Form.Item
          name="studentDetails"
          label={<span style={{ fontSize: '15px', fontWeight: 500, color: '#2c2c2c' }}>Student Details</span>}
          rules={[{ required: true, message: 'Please enter student details' }]}
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
            { required: true, message: 'Please enter project summary' },
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
            Submit Project
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProjectEditPage;
