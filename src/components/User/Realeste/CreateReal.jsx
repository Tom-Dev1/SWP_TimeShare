import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { toast } from 'react-toastify';
import './CreateReal.css';
import { BASE_URL } from '../../API/APIConfigure';
import Swal from 'sweetalert2';

function CreateReal({ onCreateSuccess }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [facility, setFacility] = useState('');
  const [price, setPrice] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xl');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
    let files = Array.from(e.target.files);
    let filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Location', location);
    formData.append('Description', description);
    formData.append('Facility', facility);
    formData.append('Price', price);
    formData.append('memberID', userInfo.id);
    imageFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });

    try {
      const response = await axios.post(BASE_URL + 'API/Realestates/CreateRealestate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Tạo mới thành công, vui lòng chờ xác nhận !!!',
      });
      setOpen(false);
      if (onCreateSuccess) {
        onCreateSuccess();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Tạo mới thất bại, vui lòng thử lại!!!',
      });
    }
  };
  return (
    <div className="create-real-estate">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Tạo mới
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} className="dialog-form">
        <h1 className="createRealTitle">Create Real Estate</h1>
        <DialogContent className="dialog-content">
          <form onSubmit={handleSubmit} className="createRealTitle_Form">
            {
              <>
                <label htmlFor="name" className="form-label">
                  Tên:
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="name" className="form-label">
                  Địa điểm
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // This should be setLocation, not setName
                />

                <label htmlFor="name" className="form-label">
                  Mô tả
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} // This should be setLocation, not setName
                />

                <label htmlFor="name" className="form-label">
                  Facility
                </label>
                <input
                  type="text"
                  value={facility}
                  onChange={(e) => setFacility(e.target.value)} // This should be setLocation, not setName
                />

                <label htmlFor="name" className="form-label">
                  Giá:
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)} // This should be setLocation, not setName
                />

                <label htmlFor="name" className="form-label">
                  Hình Ảnh
                </label>
                <input type="file" multiple onChange={handleImageChange} />
                {previewImages.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt="preview"
                    style={{ width: '200px', height: '100px' }}
                  />
                ))}
              </>
            }
            <Button className="form-field" type="submit" variant="contained" color="primary">
              Gửi
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateReal;
