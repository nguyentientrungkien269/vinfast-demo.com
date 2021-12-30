import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Table from '../../admin/table/Table'

const loginTableHead = [
    '',
    'name',
    'email',
    'password',
    'action',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>
            <Link to={`/admin/products/${item.id}`}>
                <i className="fas fa-external-link"></i>
                <span className="action">Detail</span>
            </Link>
        </td>
    </tr>
)

const Products = () => {

    const [accountData, setAccountData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost/vinfast/vinfast-backend/api/admin/readProducts.php')
            setAccountData(result.data.data);        
        }
        fetchData();
    }, [])
    return (
        <>
            <h2 className="page-header page-header--product">
                <p>Account list</p>
                <Link to="/admin/products/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </h2>
            <div className="row">
                <div className="l-12">
                    <div className="card">
                        <div className="card__body">
                            <Table 
                                limit='10'
                                headData={loginTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={accountData}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
