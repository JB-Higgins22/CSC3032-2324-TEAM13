import AdminPage from "../pages/admin-page/adminPage";
import React from 'react';
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import { SoundProvider } from '../sounds/soundContext';
import { MemoryRouter } from "react-router-dom";

// Enable fetch mocking
fetchMock.enableMocks();

const lowIssueCount = {
    "count": "1"
}

const middleIssueCount = {
    "count": "10"
}

const highIssueCount = {
    "count": "16"
}

describe('AdminPage Component', () => {
     beforeEach(() => {
        fetchMock.resetMocks();
        window.alert = jest.fn();
    });
    
    it('TC01 Page contents load correctly', async () => {
        // First response is for the issue count
        fetchMock.mockResponses(
            [JSON.stringify({ count: 5 }), { status: 200 }],  // count less than 8
            // Second response is for fetching reflections
            [JSON.stringify([
            // Example reflections data
            { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
            { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
            ]), { status: 200 }]
        );
    
        render(
            <MemoryRouter>
                <AdminPage />
            </MemoryRouter>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    
        
        const homeIcon = await screen.getByLabelText(/homeIcon/i);
        const settingsIcon = await screen.getByLabelText(/settingsIcon/i);
        const phaseOneForm = await screen.queryByLabelText(/phaseOneForm/i);
        const reflectionApprovalTable = await screen.getByLabelText(/reflectionsApprovalTable/i);

        expect(homeIcon).toBeInTheDocument();  
        expect(settingsIcon).toBeInTheDocument();
        expect(phaseOneForm).toBeInTheDocument();
        expect(reflectionApprovalTable).toBeInTheDocument();
    });

    it('TC02 Phase One Form loads correctly', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 5 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
            <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    
        
        const homeIcon = await screen.getByLabelText(/homeIcon/i);
        const settingsIcon = await screen.getByLabelText(/settingsIcon/i);
        const phaseOneForm = await screen.queryByLabelText(/phaseOneForm/i);
        const reflectionApprovalTable = await screen.getByLabelText(/reflectionsApprovalTable/i);

        expect(homeIcon).toBeInTheDocument();  
        expect(settingsIcon).toBeInTheDocument();
        expect(phaseOneForm).toBeInTheDocument();
        expect(reflectionApprovalTable).toBeInTheDocument();
    });

    it('TC03 Phase Two Form loads correctly', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 10 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    
        // Check the fetch call details
        expect(fetchMock.mock.calls.length).toBe(2); // Check how many times fetch was called
        
        const phaseTwoForm = await screen.queryByLabelText(/phaseTwoForm/i);

        expect(phaseTwoForm).toBeInTheDocument();
    });


    it('TC04 No Issue forms when issues are fully populated', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 16 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    
        // Check the fetch call details
        expect(fetchMock.mock.calls.length).toBe(2); // Check how many times fetch was called
        
        const phaseOneForm = await screen.queryByLabelText(/phaseOneForm/i);
        const phaseTwoForm = await screen.queryByLabelText(/phaseTwoForm/i);

        expect(phaseOneForm).not.toBeInTheDocument();
        expect(phaseTwoForm).not.toBeInTheDocument();
    });

    it('TC05 Confirm Quit Dialog Opened When Home Icon Clicked', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 16 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

        // simulate the click.
        const homeIcon = await screen.getByLabelText(/HomeIcon/i);
        fireEvent.click(homeIcon);
    
        const quitDialogTitle = await screen.findByText(/Are You Sure You Want to Quit?/);
        expect(quitDialogTitle).toBeInTheDocument();
      });
    
      it('TC06 Confirm Quit Dialog Closes When Cancel is Clicked', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 16 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

        // simulate the click.
        const homeIcon = await screen.getByLabelText(/HomeIcon/i);
        fireEvent.click(homeIcon);
    
        const closeButton = screen.getByRole('button', { name: 'closeConfirmQuit' });
        fireEvent.click(closeButton)
    
        expect(screen.queryByLabelText('Confirm-Quit-Dialog')).not.toBeInTheDocument();
      });
    
      it('TC07 User is redirected Home When Quit is Clicked', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 16 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    
        // simulate the click.
        const homeIcon = await screen.getByLabelText(/HomeIcon/i);
        fireEvent.click(homeIcon);
    
        const linkElement = screen.getByRole('link', { name: /Quit/i });
        expect(linkElement).toBeInTheDocument();
    
        fireEvent.click(linkElement);
        expect(window.location.pathname).toBe("/");
      });
  
      it('TC08 Settings Dialog Opened When Settings Icon Clicked', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
            return Promise.resolve(JSON.stringify({ "count": 16 }));
            } else if (req.url.endsWith('/reflections')) {
            return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
            ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
        });

        render(
            <Router>
                <SoundProvider>
                    <AdminPage />
                </SoundProvider>
            </Router>
        );

        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
      
       // simulate the click.
        const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
        fireEvent.click(settingsIcon);
    
        const settingsDialogContent = await screen.findByText(/Admin/);
        expect(settingsDialogContent).toBeInTheDocument();
      });
    
      it('TC09 Settings Dialog Can Be Closed', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
            return Promise.resolve(JSON.stringify({ "count": 16 }));
            } else if (req.url.endsWith('/reflections')) {
            return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
            ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
        });

        render(
            <Router>
                <SoundProvider>
                    <AdminPage />
                </SoundProvider>
            </Router>
        );

        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
      
        // simulate the click.
        const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
        fireEvent.click(settingsIcon);
    
        const closeButton = screen.getByRole('button', { name: 'closeSettings' });
        fireEvent.click(closeButton)
    
        expect(screen.queryByLabelText('Settings-Dialog')).not.toBeInTheDocument();
      });


      it('TC10 User clicks submit with 1+ empty fields ', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 0 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

        expect(screen.getByPlaceholderText('Name').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Description One').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Description Two').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Image URL').validity.valid).toBe(false);

        expect(screen.getByPlaceholderText('Option A').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option A Nationalist Perspective').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option A Unionist Perspective').validity.valid).toBe(false);

        expect(screen.getByPlaceholderText('Option B').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option B Nationalist Perspective').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option B Unionist Perspective').validity.valid).toBe(false);

        expect(screen.getByPlaceholderText('Option C').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option C Nationalist Perspective').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option C Unionist Perspective').validity.valid).toBe(false);

      });

      it('TC11 User clicks submit with fully populated fields ', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 0 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            } else if (req.url.endsWith('/addissue')) {
                if (req.method === "POST") {
                    const requestBody = JSON.parse(req.body);
                    expect(requestBody.name).toBe('Example Name');
                    expect(requestBody.descriptionOne).toBe('Example Description One');
                    expect(requestBody.descriptionTwo).toBe('Example Description Two');
                    expect(requestBody.imageURL).toBe('http://example.com/image.png');
                    expect(requestBody.numberOfOptions).toBe('3');
                    expect(requestBody.selectedOption).toBe('X');
                    expect(requestBody.optionA).toBe('Option A Description');
                    expect(requestBody.optionANationalistWeight).toBe(0);
                    expect(requestBody.optionANationalistPerspective).toBe('Option A Nationalist Perspective Text');
                    expect(requestBody.optionAUnionistWeight).toBe(0);
                    expect(requestBody.optionAUnionistPerspective).toBe('Option A Unionist Perspective Text');
                    expect(requestBody.optionB).toBe('Option B Description');
                    expect(requestBody.optionBNationalistWeight).toBe(0);
                    expect(requestBody.optionBNationalistPerspective).toBe('Option B Nationalist Perspective Text');
                    expect(requestBody.optionBUnionistWeight).toBe(0);
                    expect(requestBody.optionBUnionistPerspective).toBe('Option B Unionist Perspective Text');
                    expect(requestBody.optionC).toBe('Option C Description');
                    expect(requestBody.optionCNationalistWeight).toBe(0);
                    expect(requestBody.optionCNationalistPerspective).toBe('Option C Nationalist Perspective Text');
                    expect(requestBody.optionCUnionistWeight).toBe(0);
                    expect(requestBody.optionCUnionistPerspective).toBe('Option C Unionist Perspective Text');
                    
                    return Promise.resolve(JSON.stringify({ success: true }));
                }
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Name'), {
            target: { value: 'Example Name' },
        });
        fireEvent.change(screen.getByPlaceholderText('Description One'), {
            target: { value: 'Example Description One' },
        });
        fireEvent.change(screen.getByPlaceholderText('Description Two'), {
            target: { value: 'Example Description Two' },
        });
        fireEvent.change(screen.getByPlaceholderText('Image URL'), {
            target: { value: 'http://example.com/image.png' },
        });

        // Mock user input for Option A fields
        fireEvent.change(screen.getByPlaceholderText('Option A'), {
            target: { value: 'Option A Description' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option A Nationalist Perspective'), {
            target: { value: 'Option A Nationalist Perspective Text' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option A Unionist Perspective'), {
            target: { value: 'Option A Unionist Perspective Text' },
        });

        // Mock user input for Option B fields
        fireEvent.change(screen.getByPlaceholderText('Option B'), {
            target: { value: 'Option B Description' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option B Nationalist Perspective'), {
            target: { value: 'Option B Nationalist Perspective Text' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option B Unionist Perspective'), {
            target: { value: 'Option B Unionist Perspective Text' },
        });

        // Mock user input for Option C fields
        fireEvent.change(screen.getByPlaceholderText('Option C'), {
            target: { value: 'Option C Description' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option C Nationalist Perspective'), {
            target: { value: 'Option C Nationalist Perspective Text' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option C Unionist Perspective'), {
            target: { value: 'Option C Unionist Perspective Text' },
        });

        // Submit the form
        await act(async () => {
            fireEvent.click(screen.getByText('Submit'));
        });

        expect(window.alert).toHaveBeenCalledWith("Issue Added Successfully");

      });

      it('TC12 Reflection awaiting approval - Approve clicked ', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 20 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            } else if (req.url.endsWith('/approvereflection')) {
                if (req.method === "POST") {
                    const requestBody = JSON.parse(req.body);
                    expect(requestBody.userName).toBe('User1');
                    expect(requestBody.userLocation).toBe('LocationA');
                    expect(requestBody.userReflection).toBe('Reflection content 1');
                    
                    
                    return Promise.resolve(JSON.stringify({ success: true }));
                }
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

        const reflectionApprovalButton = await screen.findByLabelText(/approveReflection 1/i)

        // Submit the form
        await act(async () => {
            fireEvent.click(reflectionApprovalButton);
        });

        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/approvereflection'), expect.objectContaining({
            method: 'POST',
          }));

      });

      it('TC13 Reflection awaiting approval - Delete clicked', async () => {
        // Mock responses for fetch calls
        fetchMock.mockResponse(req => {
          if (req.url.endsWith('/issueCount')) {
            return Promise.resolve(JSON.stringify({ count: 20 }));
          } else if (req.url.endsWith('/reflections')) {
            return Promise.resolve(JSON.stringify([
              { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
              { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
            ]));
          } else if (req.url.endsWith(`/deletereflection/${2}`) && req.method === "DELETE") {
            // Assume successful deletion
            return Promise.resolve(JSON.stringify({ success: true }));
          }
          // Handle default or unexpected requests
          return Promise.reject(new Error('Unknown endpoint'));
        });
      
        render(
          <Router>
            <AdminPage />
          </Router>
        );
      
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
      
        const reflectionDeleteButton = await screen.findByLabelText(/deleteReflection 2/i);
      
        // Act upon the button click
        await act(async () => {
          fireEvent.click(reflectionDeleteButton);
        });
      
        // Verify the delete fetch call was made
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/deletereflection/2'), expect.objectContaining({
          method: 'DELETE',
        }));
      
      });


      ///////////////////// THEORY

      it('TC10 User clicks submit with 1+ empty fields ', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 10 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

        expect(screen.getByPlaceholderText('Name').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Description One').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Description Two').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Image URL').validity.valid).toBe(false);

        expect(screen.getByPlaceholderText('Option A').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option A Nationalist Perspective').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option A Unionist Perspective').validity.valid).toBe(false);

        expect(screen.getByPlaceholderText('Option B').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option B Nationalist Perspective').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option B Unionist Perspective').validity.valid).toBe(false);

        expect(screen.getByPlaceholderText('Option C').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option C Nationalist Perspective').validity.valid).toBe(false);
        expect(screen.getByPlaceholderText('Option C Unionist Perspective').validity.valid).toBe(false);

      });

      it('TC11 User clicks submit with fully populated fields ', async () => {
        // First response is for the issue count
        fetchMock.mockResponse((req) => {
            if (req.url.endsWith('/issueCount')) {
              return Promise.resolve(JSON.stringify({ "count": 10 }));
            } else if (req.url.endsWith('/reflections')) {
              return Promise.resolve(JSON.stringify([
                { id: 1, username: 'User1', location: 'LocationA', content: 'Reflection content 1' },
                { id: 2, username: 'User2', location: 'LocationB', content: 'Reflection content 2' }
              ]));
            } else if (req.url.endsWith('/addissue')) {
                if (req.method === "POST") {
                    const requestBody = JSON.parse(req.body);
                    expect(requestBody.name).toBe('Example Name');
                    expect(requestBody.descriptionOne).toBe('Example Description One');
                    expect(requestBody.descriptionTwo).toBe('Example Description Two');
                    expect(requestBody.imageURL).toBe('http://example.com/image.png');
                    expect(requestBody.numberOfOptions).toBe('3');
                    expect(requestBody.selectedOption).toBe('X');
                    expect(requestBody.optionA).toBe('Option A Description');
                    expect(requestBody.optionANationalistWeight).toBe(0);
                    expect(requestBody.optionANationalistPerspective).toBe('Option A Nationalist Perspective Text');
                    expect(requestBody.optionAUnionistWeight).toBe(0);
                    expect(requestBody.optionAUnionistPerspective).toBe('Option A Unionist Perspective Text');
                    expect(requestBody.optionB).toBe('Option B Description');
                    expect(requestBody.optionBNationalistWeight).toBe(0);
                    expect(requestBody.optionBNationalistPerspective).toBe('Option B Nationalist Perspective Text');
                    expect(requestBody.optionBUnionistWeight).toBe(0);
                    expect(requestBody.optionBUnionistPerspective).toBe('Option B Unionist Perspective Text');
                    expect(requestBody.optionC).toBe('Option C Description');
                    expect(requestBody.optionCNationalistWeight).toBe(0);
                    expect(requestBody.optionCNationalistPerspective).toBe('Option C Nationalist Perspective Text');
                    expect(requestBody.optionCUnionistWeight).toBe(0);
                    expect(requestBody.optionCUnionistPerspective).toBe('Option C Unionist Perspective Text');
                    
                    return Promise.resolve(JSON.stringify({ success: true }));
                }
            }
            // Handle default or unexpected requests
            return Promise.reject(new Error('Unknown endpoint'));
          });
    
        render(
            <Router>
                <AdminPage />
            </Router>
        );
    
        // Wait for both requests to be called
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Name'), {
            target: { value: 'Example Name' },
        });
        fireEvent.change(screen.getByPlaceholderText('Description One'), {
            target: { value: 'Example Description One' },
        });
        fireEvent.change(screen.getByPlaceholderText('Description Two'), {
            target: { value: 'Example Description Two' },
        });
        fireEvent.change(screen.getByPlaceholderText('Image URL'), {
            target: { value: 'http://example.com/image.png' },
        });

        // Mock user input for Option A fields
        fireEvent.change(screen.getByPlaceholderText('Option A'), {
            target: { value: 'Option A Description' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option A Nationalist Perspective'), {
            target: { value: 'Option A Nationalist Perspective Text' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option A Unionist Perspective'), {
            target: { value: 'Option A Unionist Perspective Text' },
        });

        // Mock user input for Option B fields
        fireEvent.change(screen.getByPlaceholderText('Option B'), {
            target: { value: 'Option B Description' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option B Nationalist Perspective'), {
            target: { value: 'Option B Nationalist Perspective Text' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option B Unionist Perspective'), {
            target: { value: 'Option B Unionist Perspective Text' },
        });

        // Mock user input for Option C fields
        fireEvent.change(screen.getByPlaceholderText('Option C'), {
            target: { value: 'Option C Description' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option C Nationalist Perspective'), {
            target: { value: 'Option C Nationalist Perspective Text' },
        });
        fireEvent.change(screen.getByPlaceholderText('Option C Unionist Perspective'), {
            target: { value: 'Option C Unionist Perspective Text' },
        });

        // Submit the form
        await act(async () => {
            fireEvent.click(screen.getByText('Submit'));
        });

        expect(window.alert).toHaveBeenCalledWith("Issue Added Successfully");

      });
      

  });






