import { render,screen } from "../../../helpers/test-utils";
import Comment from "../Comment";
import { setUserData } from "../../../hooks/user.actions";
import userFixtures from "../../../helpers/fixtures/comment";
import commentFixtures from "../../../helpers/fixtures/comment";

import { BrowserRouter } from "react-router-dom";


const userData = userFixtures();

const commentData = commentFixtures(true,false,userData);

beforeEach(()=>{
    //to fully rest the state 
    localStorage.clear();

    //reset all mocks

    jest.clearAllMocks();

    setUserData({
        user:userData,
        access:null,
        refresh:null,
    });
});
test("testing comment component",()=>{
    //render your component with the BrowserRouter wrapper:
    render(
        <BrowserRouter>
        <Comment comment={commentData}/>
        </BrowserRouter>
    );

    const commentElement =screen.getByTestId("comment-test");expect(commentElement).toBeInTheDocument();

});

