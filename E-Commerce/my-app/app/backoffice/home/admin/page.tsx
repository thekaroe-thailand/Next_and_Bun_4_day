'use client'

import { Config } from "@/app/config";
import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import Modal from "../components/Modal";

export default function Admin() {
    const [admins, setAdmins] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [levels, setLevels] = useState([
        { label: 'ผู้ดูแลระบบ', value: 'admin' },
        { label: 'ผู้ใช้งานทั่วไป', value: 'user' }
    ])
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [level, setLevel] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const url = Config.apiUrl + '/api/admin/list'
            const response = await axios.get(url);

            if (response.status == 200) {
                setAdmins(response.data);
            }
        } catch (err: any) {
            Swal.fire({
                title: 'error',
                text: err.message,
                icon: 'error'
            })
        }
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const handleSave = async () => {
        try {
            const payload = {
                name: name,
                username: username,
                password: password,
                level: level
            }
            let response: any;

            if (id != '') {
                // update
                if (password != confirmPassword) {
                    Swal.fire({
                        title: 'ตรวจสอบรหัสผ่าน',
                        text: 'รหัสผ่าน และการยืนยันไม่ตรงกัน',
                        icon: 'warning',
                        timer: 1000
                    })
                    return
                }

                const url = Config.apiUrl + '/api/admin/update-data/' + id
                response = await axios.put(url, payload);
            } else {
                // insert
                const url = Config.apiUrl + '/api/admin/create';
                response = await axios.post(url, payload);
            }

            if (response.status === 200) {
                Swal.fire({
                    title: 'บันทึกข้อมูล',
                    text: 'บันทึกข้อมูลสำเร็จ',
                    icon: 'success',
                    timer: 1000
                })

                fetchData();
                closeModal();
            }
        } catch (err: any) {
            Swal.fire({
                title: 'error',
                text: err.message,
                icon: 'error'
            })
        }
    }

    const handleEdit = (admin: any) => {
        setId(admin.id);
        setName(admin.name);
        setUsername(admin.username);
        setLevel(admin.level);

        openModal();
    }

    const handleDelete = async (admin: any) => {
        const button = await Swal.fire({
            title: 'ลบผู้ใช้งาน',
            text: 'คุณต้องการลบผู้ใช้งานชื่อ ' + admin.name + ' ใช่หรือไม่ ?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        })

        if (button.isConfirmed) {
            try {
                const url = Config.apiUrl + '/api/admin/remove/' + admin.id
                const response = await axios.delete(url);

                if (response.status === 200) {
                    Swal.fire({
                        title: 'ลบข้อมูล',
                        text: 'ลบข้อมูลสำเร็จ',
                        icon: 'success',
                        timer: 1000
                    })

                    fetchData();
                }
            } catch (err: any) {
                Swal.fire({
                    title: 'error',
                    text: err.message,
                    icon: 'error'
                })
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="title">ผู้ใช้งานระบบ</div>

                <div>
                    <button onClick={openModal}>
                        <i className="fa fa-plus mr-2"></i>
                        เพิ่มรายการ
                    </button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ชื่อ</th>
                            <th>username</th>
                            <th>level</th>
                            <th className="w-[120px]" style={{ textAlign: 'center' }}>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin: any) => (
                            <tr key={admin.id}>
                                <td>{admin.name}</td>
                                <td>{admin.username}</td>
                                <td>{admin.level}</td>
                                <td>
                                    <div className="flex gap-1 justify-center">
                                        <button className="btn-edit" onClick={(e) => handleEdit(admin)}>
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn-delete" onClick={(e) => handleDelete(admin)}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal ? (
                <Modal onClose={closeModal} title="ข้อมูลผู้ใช้งาน">
                    <div>
                        <label>ชื่อ</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>confirm password</label>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>level</label>
                        <select value={level} onChange={(e) => setLevel(e.target.value)}>
                            {levels.map((level) => (
                                <option value={level.value} key={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-5">
                        <button className="modal-btn-submit modal-btn" onClick={handleSave}>
                            <i className="fa fa-check mr-2"></i>
                            save
                        </button>
                    </div>
                </Modal>
            ) : null}
        </>
    )
}