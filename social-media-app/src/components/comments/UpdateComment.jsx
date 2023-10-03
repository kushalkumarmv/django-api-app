import React, { useState, useContext } from 'react';
import { Button, Modal, Form, Dropdown } from 'react-bootstrap';
import axiosService from '../../helpers/axios';
import { act } from '@testing-library/react';
import { Context } from '../Layout';

function UpdateComment(props){
    const { postId, comment, refresh } = props;
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const [form, setForm] = useState({
        author:comment.author.id,
        body: comment.body,
        post: postId,
    });

    const {  setToaster } = useContext(Context);

    const handleClose = () => setShow(false);
    const handleShow = () =>setShow(true);

    const handleSubmit = (event)=>{
        event.preventDefault();
        const updateCommentForm =event.currentTarget;

        if(updateCommentForm.checkValidity() ===  false){
            event.stopPropagation();
        }
        setValidated(true);

        const data = {
            author:form.author,
            body:form.body,
            post:postId,
        };
        axiosService.put(`/post/${postId}/comment/${comment.id}`, data)
        .then(() => {
            handleClose();
            setToaster({
                type:"success",
                messgae:"Comment updated",
                show:true,
                title:"Success!",
            });
            refresh();
        })
        .catch((error) =>{
            setToaster({
                type:"danger",
                message:"An error occured.",
                show: true,
                title:"Comment Error",
            });
        });
    };

    return(
        <>
        <Dropdown.Item data-testid="show-modal-form"
        onClick={handleShow}>Modify</Dropdown.Item>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='border-0'>
                <Modal.Title>Update Post</Modal.Title>
            </Modal.Header>
            <Modal.Body className='border-0'>
                <Form noValidate 
                validated ={validated}
                data-testid="update-comment-test"
                onSubmit={handleSubmit}>
                    
                    <Form.Group className='mb-3'>
                        <Form.Control name="body" 
                        value={form.body}
                        data-testid="comment-body-field"
                        onChange={(e)=> act(()=>{setForm({...form,body:e.target.value})})}
                        as="textarea" rows={3}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" 
                data-testid="update-comment-submit"
                onClick={handleSubmit}>Modify</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default UpdateComment;