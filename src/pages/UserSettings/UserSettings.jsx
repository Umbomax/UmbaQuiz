import React from "react";
import axios from 'axios';
import {useState } from "react";
import clases from "./UserSettings.module.css"
function UserSettings() {

        const [selectedFile, setSelectedFile] = useState(null);

        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
            console.log("working")
            
        };

        const handleUpload = () => {
            if (selectedFile) {
                const token = localStorage.getItem('token')
                const formData = new FormData();
                console.log(selectedFile)
                formData.append("image", selectedFile);
                console.log(formData.get('image')); // Проверяем, что файл добавлен в FormData
                axios
                    .post("http://localhost:3030/api/uploadFile", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        console.log("File uploaded successfully:", response);
                        // Добавьте здесь логику обработки успешной загрузки
                    })
                    .catch((error) => {
                        console.error("Error uploading file:", error);
                        // Добавьте здесь логику обработки ошибки загрузки
                    });
            } else {
                console.error("No file selected");
                // Добавьте здесь логику для случая, когда файл не выбран
            }
        }
        return (
            <div >
                <h2 className={clases.test}>Upload Image</h2>
                <input type="file" onChange={handleFileChange} multiple accept="image/*" />
                <button onClick={handleUpload}>Upload</button>
            </div>
        );
    
}

export default UserSettings;
