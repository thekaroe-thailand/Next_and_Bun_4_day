'use client'

import { Config } from "@/app/config";
import { OrderInterface } from "@/app/interface/OrderInterface"
import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import Modal from "../components/Modal";

export default function Order() {
    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [order, setOrder] = useState<OrderInterface>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = Config.apiUrl + '/api/order/list';
            const response = await axios.get(url);

            if (response.status === 200) {
                const rows = [];

                for (let i = 0; i < response.data.length; i++) {
                    const order = response.data[i];

                    let sum = 0;

                    for (let j = 0; j < order.OrderDetail.length; j++) {
                        const orderDetail = order.OrderDetail[j];
                        const price = orderDetail.price;
                        const qty = orderDetail.qty;
                        const amount = (qty * price);

                        orderDetail.amount = amount;

                        sum += amount;
                    }

                    order.sum = sum;

                    rows.push(order);
                }

                setOrders(rows);
            }
        } catch (err: any) {
            Swal.fire({
                title: 'error',
                icon: 'error',
                text: err.message
            })
        }
    }

    const openModal = (order: OrderInterface) => {
        setShowModal(true);
        setOrder(order);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className="container">
            <div className="title">รายการสั่งซื้อ</div>
            <table className="table">
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>ผู้รับสินค้า</th>
                        <th>ที่อยู่จัดส่ง</th>
                        <th>เบอร์โทรติดต่อ</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>{order.customerName}</td>
                            <td>{order.customerAddress}</td>
                            <td>{order.customerPhone}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={(e) => openModal(order)}>
                                    <i className="fa fa-file mr-2"></i>
                                    ดูข้อมูล
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <Modal title="รายการสินค้า" onClose={closeModal} size="xl">
                    <div>
                        <label>รหัสติดตามพัสดุ</label>
                        <input />
                    </div>
                    <div>
                        <label>บริษัทขนส่ง</label>
                        <input />
                    </div>
                    <div>
                        <label>เอกสารการโอนเงิน</label>
                        <i className="fa fa-image text-white text-8xl"></i>
                    </div>

                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th style={{ textAlign: 'right' }}>ราคา</th>
                                <th style={{ textAlign: 'right' }}>จำนวน</th>
                                <th style={{ textAlign: 'right' }}>ยอดรวม</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.OrderDetail.map((orderDetail) => (
                                <tr key={orderDetail.id}>
                                    <td>{orderDetail.Book.isbn}</td>
                                    <td>{orderDetail.Book.name}</td>
                                    <td className="text-right">{orderDetail.price}</td>
                                    <td className="text-right">{orderDetail.qty}</td>
                                    <td className="text-right">{orderDetail.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-gray-400 justify-center mt-3 text-xl flex gap-3">
                        <span>ยอดรวม:</span>
                        <span className="text-amber-300">{order?.sum.toLocaleString()}</span>
                        <span>บาท</span>
                    </div>

                    <div>
                        <label>หมายเหตุ</label>
                        <input />
                    </div>

                    <div className="mt-5 flex justify-center gap-2">
                        <button className="modal-btn-order-cancel">
                            <i className="fa fa-times mr-2"></i>
                            ยกเลิก
                        </button>
                        <button className="modal-btn-get-money">
                            <i className="fa fa-check mr-2"></i>
                            ได้รับเงินแล้ว
                        </button>
                        <button className="modal-btn-send">
                            <i className="fa fa-circle-check mr-2"></i>
                            จัดส่งสินค้าแล้ว
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    )
}