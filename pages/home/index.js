import { useState, useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import {
  Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddinTodo, DeleteinTodo, UpdateinTodo } from '../../redux/TodoSlice'
import NavBar from '../../Components/NavBar';
import ReactPaginate from 'react-paginate';
import { useRouter } from 'next/router';
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { BiTask } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// toast.configure()
export default function Home(props) {
  const router = useRouter()
  const titleRef = useRef("")
  const descriptionRef = useRef("")
  const TodoList = useSelector((state) => state.Todo.value)
  const [todo, setTodo] = useState({
    title: "", description: ""
  })
  const [bool, setBool] = useState(1)
  const [prevdata, setPrevData] = useState('')
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({
    title: true, description: true, updateTitle: true, updateDescription: true
  })
  const dataperpage = 3;
  const [pagenumber, setPagenumber] = useState(0);
  const pagevisited = pagenumber * dataperpage;
  const pagecount = Math.ceil(TodoList.length / dataperpage);
  const success = (data) => toast.success(data, { position: toast.POSITION.TOP_RIGHT });
  const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_RIGHT });

  // this function is for form validation
  const Handler = (event) => {
    const { value, name } = event.target
    switch (name) {
      case 'title':
        setTodo({ ...todo, title: value })
        value !== "" ? setErrors({ ...errors, title: true }) :
          setErrors({ ...errors, title: false })
        break;
      case 'description': setTodo({ ...todo, description: value })
        value !== "" ? setErrors({ ...errors, description: true }) :
          setErrors({ ...errors, description: false })
        break;
      case 'updateTitle': setPrevData({ ...prevdata, title: value })
        value !== "" ? setErrors({ ...errors, updateTitle: true }) :
          setErrors({ ...errors, updateTitle: false })
        break;
      case 'updateDescription': setPrevData({ ...prevdata, description: value })
        value !== "" ? setErrors({ ...errors, updateDescription: true }) :
          setErrors({ ...errors, updateDescription: false })
        break;
    }
  }

  // this function is for pagination
  const handlePageClicked = ({ selected }) => {
    setPagenumber(selected);
  };

  // Submit function
  const Submit = () => {
    if (todo.title == "" || todo.description == "") {
      (todo.title == "" || todo.title == null) && (todo.description == "" || todo.description == null) ?
        setErrors({ ...errors, description: false, title: false })
        : (todo.title == "" || todo.title == null) && todo.description !== "" ?
          setErrors({ ...errors, description: true, title: false })
          : setErrors({ ...errors, description: false, title: true })
      failure("Please Enter Valid details")
    } else {
      let id = Math.floor(Math.random() * 1000)
      const newData = {
        ...todo, id: id
      }
      dispatch(AddinTodo(newData))
      success('Todo Added')
      setTodo({ title: "", description: "" })
      titleRef.current.value = ""
      descriptionRef.current.value == ""
    }
  }

  // delete the task with specific ID
  const DeleteTask = (id) => {
    dispatch(DeleteinTodo(id))
    success('Todo Deleted')
  }

  // update the task details
  const UpdateTask = () => {
    if (prevdata.title == "" || prevdata.description == "") {

      (prevdata.title == "" || prevdata.title == null) && (prevdata.description == "" || prevdata.description == null) ?
        setErrors({ ...errors, updateDescription: false, updateTitle: false })
        : (prevdata.title == "" || prevdata.title == null) && prevdata.description !== "" ?
          setErrors({ ...errors, updateDescription: true, updateTitle: false })
          : setErrors({ ...errors, updateDescription: false, updateTitle: true })
      failure("Please Enter Valid details")

    } else {
      dispatch(UpdateinTodo(prevdata))
      setTodo({ title: "", description: "" })
      setPrevData({ title: "", description: "" })
      success("Todo Updated")
      setBool(1)
      titleRef.current.value = ""
      descriptionRef.current.value == ""
    }
  }

  // task details by id
  const GetDetails = (id) => {
    router.replace({
      pathname: '/tododetails/' + id
    })
  }


  useEffect(() => {
    if (!sessionStorage.getItem("userdetails")) {
      router.push('/')
    }
  }, [])
  return (
    <div>
      <NavBar id={null} path={"/home"} />
      <ToastContainer />
      <Container >
        <br />
        <Row>
          <Col lg={5} >{
            bool ?
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <BiTask className='pointer me-2' size="20px" />
                  Enter Task
                </CardTitle>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Title</Label>
                      <Input
                        name="title"
                        ref={titleRef}
                        onChange={Handler}
                        value={todo.title}
                        type="text"
                      />
                      {errors.title == false ? <span className='text-danger errmsg'>Title should not be empty</span> : ""}
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleText">Description</Label>
                      <Input id="exampleText" name="description" value={todo.description} type="textarea" onChange={Handler} />
                      {errors.description == false ? <span className='text-danger errmsg'>Description should not be empty</span> : ""}
                    </FormGroup>
                    <Button className='btn-sm' color='success' onClick={Submit}>Submit</Button>&nbsp;
                    <Button className='btn-sm' onClick={() => {
                      setTodo({ title: "", description: "" })
                    }}>Clear</Button>
                  </Form>
                </CardBody>
              </Card>
              :
              <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                  <BiTask className='pointer me-2' size="20px" />
                  Update Task
                </CardTitle>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Title</Label>
                      <Input
                        name="updateTitle"
                        ref={titleRef}
                        value={prevdata.title}
                        onChange={Handler}
                        type="text"
                      />
                      {errors.updateTitle == false ? <span className='text-danger errmsg'>Title should not be empty</span> : ""}
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleText">Description</Label>
                      <Input id="exampleText" value={prevdata.description} name="updateDescription" type="textarea" onChange={Handler} />
                      {errors.updateDescription == false ? <span className='text-danger errmsg'>Description should not be empty</span> : ""}
                    </FormGroup>
                    <Button className='btn-sm' color='success' onClick={UpdateTask}>Update</Button>
                  </Form>
                </CardBody>
              </Card>
          }
          </Col>
          <Col lg={7}>
            <Card>
              <CardBody>
                <CardTitle tag="h5" className=''>Todo Data</CardTitle>
                <div className="table-responsive">
                  <Table className="text-nowrap mt-3 align-middle" borderless>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TodoList.length != 0 ? TodoList.slice(pagevisited, pagevisited + dataperpage).map((data, index) => (
                        <tr key={index} className="border-top">
                          <td>
                            <div className="d-flex align-items-center p-2">
                              <div className="ms-3">
                                <h6 className="mb-0 pointer" onClick={() => { GetDetails(data.id) }} >{data.title}</h6>
                              </div>
                            </div>
                          </td>
                          <td className='pointer' onClick={() => { GetDetails(data.id) }}>{data.description}</td>
                          <td>
                            <MdDelete className='pointer' onClick={() => { DeleteTask(data.id) }} color="orange" size="20px" />
                            &nbsp;&nbsp;
                            <MdModeEditOutline className='pointer' color='green' size="20px" onClick={() => {
                              setBool(0)
                              setPrevData(data)
                            }} />
                          </td>
                        </tr>
                      )) :
                        <tr>
                          <td colSpan={3} className="text-center">No Data Present</td>
                        </tr>
                      }
                    </tbody>
                  </Table>
                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    pageCount={pagecount}
                    onPageChange={handlePageClicked}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"bg"}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <br />
      </Container>

    </div>
  )
}

