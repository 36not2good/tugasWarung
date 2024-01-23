import react, { Component } from "react";
import "./Tabel.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs"

export default class Tabel extends Component {
    render() {
        return (
            <div className="tabel-wrapper">
                <table className="tabel">
                    <thead>
                        <tr>
                            <th className="expand">No</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th className="expand">Stok</th>
                            <th className="expand" colSpan={2}>Aksi</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>isi 1</td>
                            <td>isi 2</td>
                            <td className="label-harga"><span>isi 3</span></td>
                            <td className="label-stok"><span>isi 3</span></td>
                            <td className="aksi">
                                <span className="icon-wrapper">
                                    <BsFillPencilFill />
                                </span>
                                <span className="icon-wrapper">
                                    <BsFillTrashFill className="delete-button" />
                                </span>

                            </td>
                        </tr>
                        <tr>
                            <td>isi 1</td>
                            <td>isi 2</td>
                            <td className="label-harga">isi 3</td>
                            <td className="label-stok">isi 3</td>
                            <td>
                                <span className="aksi">
                                    <BsFillPencilFill />
                                    <BsFillTrashFill className="delete-button" />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>isi 1</td>
                            <td>isi 2</td>
                            <td className="label-harga"><span>isi 3</span></td>
                            <td className="label-stok"><span>isi 3</span></td>
                            <td>
                                <span className="aksi">
                                    <BsFillPencilFill />
                                    <BsFillTrashFill className="delete-button" />
                                </span>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        )
    }
}