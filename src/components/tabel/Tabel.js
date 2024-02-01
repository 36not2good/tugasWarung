import react, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Tabel.css";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

// class Tabel extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [
//         { id: 1, nama: "Makanan 1", kategori:"Makanan", harga: 10000, stok: 5 },
//         { id: 2, nama: "minuman 2", kategori:"minuman", harga: 15000, stok: 8 },
//         { id: 3, nama: "Makanan 3", kategori:"Makanan", harga: 20000, stok: 3 },
//         { id: 4, nama: "minuman 3", kategori:"minuman", harga: 20000, stok: 7 },
//       ],
//       newItem: { nama: "", harga: 0, stok: 0 },
//       editItemId: null,
//     };
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       newItem: { ...prevState.newItem, [name]: value },
//     }));
//   };


 
//   handleDelete = (id) => {
//     this.setState((prevState) => ({
//       data: prevState.data.filter((item) => item.id !== id),
//     }));

//   };

//   render() {
//     const { data, newItem, editItemId } = this.state;

//     return (
//       <div className="tabel-wrapper">
//         <table className="tabel">
//           <thead>
//             <tr>
//               <th className="expand">No</th>
//               <th>Nama</th>
//               <th className="expand">Kategori</th>
//               <th>Harga</th>
//               <th className="expand">Stok</th>
//               <th className="expand" colSpan={2}>
//                 Aksi
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.nama}</td>
//                 <td>{item.kategori}</td>
//                 <td>{item.harga}</td>
//                 <td>{item.stok}</td>
//                 <td className="aksi">
//                   <span className="icon-wrapper">
//                     <NavLink
//                       to={`/dashboard/${item.id}`}
//                       className="tabel-menu"
//                       state={{ title: "" }}
//                     >
//                       <BsFillPencilFill />
//                     </NavLink>
//                   </span>
//                   <span className="icon-wrapper">
//                     <BsFillTrashFill className="delete-button" onClick={() => this.handleDelete(item.id)}/>
//                   </span>
//                 </td>
//               </tr>
//             ))}
            
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

class Tabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      newItem: { nama: "", harga: 0, stok: 0 },
      editItemId: null,
      filteredData: props.data,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      this.filterData();
    }
  }

  filterData = () => {
    const { data, selectedCategory } = this.props;
    const filteredData = selectedCategory
      ? data.filter((item) => item.kategori === selectedCategory)
      : data;

    this.setState({ filteredData });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newItem: { ...prevState.newItem, [name]: value },
    }));
  };

  handleDelete = (id) => {
    this.setState(
      (prevState) => ({
        data: prevState.data.filter((item) => item.id !== id),
      }),
      () => this.filterData()
    );
  };

  render() {
    const { filteredData, newItem, editItemId } = this.state;

    return (
      <div className="tabel-wrapper">
        <table className="tabel">
          <thead>
            <tr>
              <th className="expand">No</th>
              <th>Nama</th>
              <th className="expand">Kategori</th>
              <th>Harga</th>
              <th className="expand">Stok</th>
              <th className="expand" colSpan={2}>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.kategori}</td>
                <td>{item.harga}</td>
                <td>{item.stok}</td>
                <td className="aksi">
                  <span className="icon-wrapper">
                    <NavLink
                      to={`/dashboard/${item.id}`}
                      className="tabel-menu"
                      state={{ title: "" }}
                    >
                      <BsFillPencilFill />
                    </NavLink>
                  </span>
                  <span
                    className="icon-wrapper"
                    onClick={() => this.handleDelete(item.id)}
                  >
                    <BsFillTrashFill className="delete-button" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tabel;