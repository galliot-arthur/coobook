import Axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import Field from '../components/forms/Field'
import Pagination from '../components/Pagination'
import customersAPI from '../services/customersAPI'
import { AddFileIcons, CompanyIcons, EditIcons, InvoiceIcons, SearchIcons, TrashIcons, UserCircleIcons, UserIcons } from '../ui/Icons'
import { Loader } from '../ui/Loader'

export function CustomerPage({ history }) {
    const [customers, setCustomers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    /* GET CUSTOMERS */
    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.findAll()
            setCustomers(data)
        } catch (e) { console.log(e.response) }
    }
    useEffect(() => { fetchCustomers() }, [])

    /* HANDLE DELETING CUSTOMER */
    const handleDelete = async (id) => {
        const originalCustomers = [...customers]
        setCustomers(customers.filter(customer => customer.id !== id))
        try {
            await customersAPI.deleteById(id)
        } catch {
            setCustomers(originalCustomers)
        }
    }

    /* PAGINATION */
    const handlePageChanged = page => setCurrentPage(page);
    const itemsPerPage = 11;

    /* SEARCH */
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    /* FILTERING RECIPES BY SEARCH */
    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    )
    /* HANDLE PAGINATION */
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)

    return (
        <div>
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h1 className="display-4">Clients</h1>
                    <p className="lead">Vos clients en un clin d'œil</p>
                </div>
                <NavLink to="/client/ajout" className="text-decoration-none" >
                    <AddFileIcons className="text-decoration-none" /> Nouveau
                </NavLink>
            </div>
            <hr className="my-4" />

            <div className="input-group mb-3">
                <label
                    className="input-group-text"
                    htmlFor="search">
                    <SearchIcons />
                </label>
                <input
                    type="text"
                    id="search"
                    onChange={handleSearch}
                    value={search}
                    className="form-control"
                    placeholder="Rechercher..."
                />
            </div>
            <div className="container mb-5">
                {

                    customers.length == 0 ?
                        <div>
                            <Loader look="d-flex justify-content-center my-3 align-items-center" />
                        </div> :

                        paginatedCustomers.map(customer =>
                            <Customer
                                key={customer.id}
                                customer={customer}
                                onDelete={() => handleDelete(customer.id)}
                            />
                        )

                }

                {
                    itemsPerPage < filteredCustomers.length &&
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredCustomers.length}
                        onPageChanged={handlePageChanged}
                    />
                }
            </div>
        </div>
    )
}


const Customer = ({ customer, onDelete }) => {
    const [details, setDetails] = useState(false)

    const toggleDetails = () => {
        setDetails(!details)
    }


    const formatDate = str => moment(str).format('DD/MM/YYYY')
    const STATUS_CLASSES = {
        PAID: "success",
        SENT: "primary",
        CANCELLED: "secondary"
    }
    const STATUS_LABELS = {
        PAID: "Payée",
        SENT: "Envoyée",
        CANCELLED: "Annulée"
    }

    return (
        <div className="row align-items-center fade-start">
            <div className="col-6 align-items-center">
                <div>
                    <UserIcons /> <a href="#">{customer.firstName} {customer.lastName}</a>
                </div>
                <div>
                    {customer.email}
                </div>
                <div>
                    <CompanyIcons /> {customer.company}
                </div>
            </div>

            <div className="col-6">
                <div className="d-flex flex-column justify-content-between align-items-end">
                    <div className="px-2">
                        <InvoiceIcons /> factures : {customer.invoices.length}
                    </div>
                    <div className="">
                        <span className="text-muted">total : </span>{customer.totalAmount.toLocaleString()} €
                    </div>
                    <div className="ps-1">
                        <button
                            onClick={() => toggleDetails()}
                            className="ms-auto me-2">
                            <UserCircleIcons />
                        </button>
                        <NavLink
                            to={"/client/" + customer.id}
                            className="ms-auto me-2">
                            <EditIcons />
                        </NavLink>
                        <button
                            onClick={onDelete}
                            className="ms-auto">
                            <TrashIcons />
                        </button>
                    </div>
                </div>
            </div>
            {
                details &&
                <ul className="list-group my-3 fade-start">
                    <li className="list-group-item">
                        <h5>Factures</h5>
                    </li>
                    {
                        customer.invoices.map(invoice =>
                            <li
                                key={invoice.id}
                                className="list-group-item fade show"
                            >
                                <strong>n° {invoice.chrono} </strong>: {invoice.amout.toLocaleString()} €<br />
                                {formatDate(invoice.sentAt)} <br />
                                <span className={"text-" + STATUS_CLASSES[invoice.status]}>
                                    {STATUS_LABELS[invoice.status]}
                                </span>
                            </li>
                        )
                    }
                </ul>
            }
            <hr className="mt-1" />
        </div>)
}
