import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Function to add todo
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: title,
      note: note,
      date: date,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    // Clear input fields after adding todo
    setTitle('');
    setNote('');
    setDate('');
  };

  // Function to delete todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  // Function to edit todo
  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setTitle(todoToEdit.title);
    setNote(todoToEdit.note);
    setDate(todoToEdit.date);
    setEditTodoId(id);
  };

  // Function to update todo
  const updateTodo = () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === editTodoId) {
        return {
          ...todo,
          title: title,
          note: note,
          date: date
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    // Clear input fields after updating todo
    setTitle('');
    setNote('');
    setDate('');
    setEditTodoId(null);
  };

  function formatDateTime(dateTimeString) {
    // แปลงเป็นวัตถุ Date
    const dateTime = new Date(dateTimeString);
  
    // แปลงเป็นรูปแบบ "yyyy-mm-dd hh:mm"
    const formattedDateTime = dateTime.toLocaleString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  
    return formattedDateTime;
  }

  return (
    <div className='container'>
      <h3 style={{ paddingTop: '10px', paddingBottom: '10px', textAlign: 'center' }}>ระบบวางแผนกิจกรรมประจำวัน</h3>
      <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          เพิ่มรายการ
        </button>
      </div>

      {/* Modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">{editTodoId ? 'แก้ไขรายการ' : 'เพิ่มรายการ'}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">วันที่/เวลา</label>
                <input type="datetime-local" className="form-control" onChange={(e) => setDate(e.target.value)} id="exampleFormControlInput1" placeholder="กรอกวันที่" value={date} />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">ชื่อรายการ</label>
                <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} id="exampleFormControlInput1" placeholder="กรอกรายการ" value={title} />
              </div>

              <div className="mb-3">
                <label>โน๊ต</label>
                <textarea placeholder='โน๊ต' onChange={(e) => setNote(e.target.value)} className='form-control' value={note}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {editTodoId ? (
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateTodo}>บันทึก</button>
              ) : (
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addTodo}>เพิ่ม</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%' }} className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ชื่องาน</th>
            <th scope="col">วันที่จะทำ</th>
            <th scope="col">โน๊ต</th>
            <th scope="col">สถานะ</th>
            <th scope="col">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <th scope="row">{index + 1}</th>
              <td>{todo.title}</td>
              <td>{formatDateTime(todo.date)}</td>
              <td>{todo.note}</td>
              <td>{todo.completed ? 'ทำแล้ว' : 'รอทำ'}</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => editTodo(todo.id)}>แก้ไข</button>
                  <button type="button" className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>ลบ</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
