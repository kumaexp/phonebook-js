import { useEffect, useState } from 'react';
import './App.css';
import Dialog from './components/Dialog';
import MenuItem from './components/Menuitem';
import Searchbox from './components/Searchbox';

function App() {
  const [title, setTitle] = useState("Buku Telepon");
  const [phoneList, setList] = useState([]);
  const [idGen, setId] = useState(0);
  const [dialogFlag, setDialogState] = useState(false);

  const [editData, setEditData] = useState({});
  const [activeFilter, setFilter] = useState("");

  const [searchList, updateSearch] = useState([]);
  const [searchText, setSearch] = useState("");

  const filterList = [
    {
      id:0,
      title: "Semua",
      filter: "",
    },
    {
      id: 1,
      title: "Keluarga",
      filter: "family",
    },
    {
      id: 2,
      title: "Teman Dekat",
      filter: "relative",
    },
    {
      id: 3,
      title: "Orang Lain",
      filter: "other",
    },
  ];

  function addOrUpdateItem(data) {
    if(data.id !== undefined && data.id !== null) {
      const dupedList = [...phoneList];
      const editedData = dupedList.find(item => item.id === data.id);
      Object.assign(editedData, data);
      setList(dupedList);
    } else {
      setList([
        ...phoneList,
        {
          ...data,
          icon: "/img/ogey.jpg",
          id: idGen,
        }
      ]);
      setId(idGen + 1);
    }
    
    closeDialog();
  }

  function startEditItem(id) {
    const currentList = phoneList.find(item => item.id === id);
    setEditData(currentList);
    openDialog();
  }

  function removeItem(id) {
    console.log("Remove This Item", id);
    setList(phoneList.filter(item => item.id !== id));
  }

  function openDialog() {
    setDialogState(true); // set dialog true
  }

  function closeDialog() {
    setDialogState(false);
    setEditData({});
  }

  function findItem(text, filter) {
    setSearch(text);
    const filtered = phoneList.filter(item =>
      (item.tag === filter || filter === "") &&
      (item.name.includes(text) || item.telp.includes(text))
      );
    console.log(text, filtered);
    updateSearch(filtered);
  }

  useEffect(() => {
    findItem(searchText, activeFilter);
  }, [searchText, activeFilter]);

  return (
    <div className="m-auto w-2/4 border-2 border-black mt-10">
      <header className="font-bold text-center h-10">
        <h1>{title}</h1>
      </header>
      <Searchbox onSearch={findItem} />
      <div className="flex justify-evenly">
        {
          filterList.map(({filter, title, id}) =>
            <button
              key={id}
              className={`${activeFilter === filter && "bg-gray-600"} px-2 py-1 rounded-md bg-gray-400 text-white mx-2`}
              onClick={() => setFilter(filter)}
            >
              {title}
            </button>
          )
        }
      </div>
      {
        phoneList.length === 0 && <p>Click + to add some list!</p>
      }
      {
        searchText.length > 0 && 
        <div>Hasil Pencarian: 
          <strong>{searchList.length === 0 ? "tidak ditemukan" : ""}</strong>
        </div>
      }
      <main>
        {
          ((searchText.length > 0 || activeFilter.length > 0) ? searchList : phoneList).map(item => 
            <MenuItem 
              {...item} // spread operator
              onDelete={removeItem}
              onEdit={startEditItem} 
              key={item.id}
            />
          )
        }
      </main>
      <div>
        <button onClick={() => openDialog()} className="rounded-full bg-blue-400 text-white fixed right-2 bottom-2 h-10 w-10">+</button>
      </div>

      {
        dialogFlag && 
        <Dialog 
          data={editData}
          onConfirm={addOrUpdateItem} 
          onCancel={closeDialog}
        />
      }

    </div>
  );
}

export default App;
