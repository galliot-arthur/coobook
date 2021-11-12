import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import invoicesAPI from '../services/invoicesAPI'
import { CompanyIcons, InvoiceIcons, SearchIcons, TrashIcons, UserIcons } from '../ui/Icons'
import { Loader } from '../ui/Loader'
import moment from 'moment'

export function InvoicePage() {
    const [invoices, setInvoices] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    /* GET INVOICES */
    const fetchInvoices = async () => {
        try {
            const data = await invoicesAPI.findAll()
            setInvoices(data)
        } catch (e) { console.log(e.response) }
    }
    useEffect(() => { fetchInvoices() }, [])

    /* HANDLE DELETING INVOICES */
    const handleDelete = async (id) => {
        const originalInvoices = [...invoices]
        setInvoices(invoices.filter(invoice => invoice.id !== id))
        try {
            await invoicesAPI.deleteById(id)
        } catch {
            setInvoices(originalInvoices)
        }
    }

    /* PAGINATION */
    const handlePageChanged = page => setCurrentPage(page);
    const itemsPerPage = 100;

    /* SEARCH */
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }
    /* FILTERING INVOICES BY SEARCH */
    const filteredInvoices = invoices.filter(i =>
        i.customer.company.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.lastName.toLowerCase().includes(search.toLowerCase())
    )
    /* HANDLE PAGINATION */
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage)
    return (
        <div>
            <h1 className="display-4">Factures</h1>
            <p className="lead">Retrouvez toutes vos factures</p>
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

                    invoices.length == 0 ?
                        <div>
                            <Loader look="d-flex justify-content-center my-3 align-items-center" />
                        </div>
                        :
                        paginatedInvoices.map(invoice =>
                            <Invoice
                                key={invoice.id}
                                invoice={invoice}
                                onDelete={() => handleDelete(invoice.id)}
                            />
                        )

                }

                {
                    itemsPerPage < filteredInvoices.length &&
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        length={filteredInvoices.length}
                        onPageChanged={handlePageChanged}
                    />
                }
            </div>
        </div>
    )
}

const Invoice = ({ invoice, onDelete }) => {

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
        <div className="row align-items-center">

            <div className="col-6 align-items-center">
                <div>
                    <UserIcons /> <a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a>
                </div>
                <div>
                    {invoice.amout.toLocaleString()} €
                </div>
                <div>
                    <CompanyIcons /> {invoice.customer.company}
                </div>
            </div>

            <div className="col-6">
                <div className="d-flex flex-column justify-content-between align-items-end">
                    <div className="px-2">
                        <InvoiceIcons /> <strong>n°{invoice.chrono} : </strong>
                        <span className={"text-" + STATUS_CLASSES[invoice.status]}>
                            {STATUS_LABELS[invoice.status]}
                        </span>
                    </div>
                    <div className="">
                        <span className="text-muted"> {formatDate(invoice.sentAt)} </span>
                    </div>
                    <div className="ps-1">
                        <button
                            onClick={onDelete}
                            className="ms-auto">
                            <TrashIcons />
                        </button>
                    </div>
                </div>
            </div>
            <hr className="mt-1" />
        </div>)
}
