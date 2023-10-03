import { render, screen  } from "../../../helpers/test-utils";
import userFixtures from "../../../helpers/fixtures/user";
import ProfileDetails from "../ProfileDetails";
import { setUserData } from "../../../hooks/user.actions";
import { MemoryRouter } from "react-router-dom";


const userData = userFixtures();

beforeEach(()=>{
    //t fully reset the state between __test__,clear the storage
    localStorage.clear();
    //and reset all mocks
    jest.clearAllMocks();

    setUserData({
        user:userData,
        access:null,
        refresh:null,
    });
});

test("Render profile details component",()=>{
    render(
        // Wrap your component with MemoryRouter in your test
    <MemoryRouter>
        <ProfileDetails user={userData}/>
    </MemoryRouter>
    
    );

    const profileDetails =screen.getByTestId("profile-details");
    expect(profileDetails).toBeInTheDocument();

    const nameElement = screen.getByText(userData.name);
    expect(nameElement).toBeInTheDocument();

    const  bioElement =screen.getByText(userData.bio);
    expect(bioElement).toBeInTheDocument();
});