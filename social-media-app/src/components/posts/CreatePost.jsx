import React,{ useState, useContext } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from '../../helpers/axios';
import { act } from '@testing-library/react';
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreatePost(props){

    const [show,setShow]= useState(false);

    const handleClose =()=>setShow(false);
    const handleShow=()=>setShow(true);

    const [validated,setValidated]= useState(false);
    const [form,setForm] = useState({
        author:"",
        body:"",
    });

    const { setToaster } = useContext(Context)

    const user = getUser();

    const { refresh }= props;

    const handleSubmit = (event) =>{
        event.preventDefault();
        const createPostForm = event.currentTarget;

        if (createPostForm.checkValidity()=== false){
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            author:user.id,
            body:form.body,
        };

        axiosService.post("/post/",data)
        .then(()=>{
            handleClose();
            setToaster({
                message:'Your post has been created',
                type:"success",
                show:true,
                title:"Post success",
            })
            setForm({});
            refresh();
        })
        .catch(()=>{
            setToaster({
                type:"danger",
                meassge:"An error occured",
                show:true,
                title:"Post error",
            });
        });
    };

    return(
        <>
        <Form.Group className="my-3 w-75">
            <Form.Control className="py-2 rounded-pill border-primary text-primary" type="text"
            data-testid="show-modal-form"

            placeholder="Write a post"
            onClick={handleShow}
            />
        </Form.Group>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="border-0">
                <Modal.Title>Create Post</Modal.Title>                
            </Modal.Header>
            <Modal.Body className="boder-0">
                <Form noValidate 
                validated={validated} 
                onSubmit={handleSubmit}
                data-testid="create-post-form">
                    <Form.Group className="mb-3">
                        <Form.Control name="body" 
                        data-testid="post-body-field" 
                        value={form.body} onChange={(e)=>{act(()=>{setForm({...form, body: e.target.value})})}}
                        as="textarea" rows={3}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" 
                onClick={handleSubmit}
                data-testid="create-post-submit"
                disabled={!form.body}>
                Post
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CreatePost;