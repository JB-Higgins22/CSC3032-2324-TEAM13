// Import necessary utilities and component
import React from 'react';
import { render, waitFor, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Scales from '../pages/scales/scales';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';
import { SoundProvider } from '../sounds/soundContext';

// Enable fetch mocking
fetchMock.enableMocks();

const mockData = [
  {
    "id": 1,
    "name": "Dummy Issue 1",
    "description_one": "This is a test issue.",
    "description_two": "This is a test issue.",
    "image_url": "/dummyimage.jpeg",
    "number_of_options": 3,
    "selected_option": "X",
    "option_a": "Option A (Representative of total imbalance, + Nationalist)",
    "option_a_nationalist_weight": 100,
    "option_a_nationalist_perspective": "Scales tipped totally in our favour.",
    "option_a_unionist_weight": 0,
    "option_a_unionist_perspective": "No Weight Here.",
    "option_b": "Option B (Representative of total balance)",
    "option_b_nationalist_weight": 100,
    "option_b_nationalist_perspective": "Even",
    "option_b_unionist_weight": 100,
    "option_b_unionist_perspective": "Even",
    "option_c": "Option C (Representative of partial balance, + Unionist)",
    "option_c_nationalist_weight": 20,
    "option_c_nationalist_perspective": "A little weight on this side",
    "option_c_unionist_weight": 80,
    "option_c_unionist_perspective": "Lots of weight on this side."
  },
  {
    "id": 2,
    "name": "Dummy Issue 2",
    "description_one": "This is a test issue.",
    "description_two": "This is a test issue.",
    "image_url": "/dummyimage.jpeg",
    "number_of_options": 3,
    "selected_option": "X",
    "option_a": "Option A (Representative of total imbalance, + Unionist)",
    "option_a_nationalist_weight": 0,
    "option_a_nationalist_perspective": "No Weight Here",
    "option_a_unionist_weight": 100,
    "option_a_unionist_perspective": "Scales tipped totally in our favour.",
    "option_b": "Option B (Representative of total balance)",
    "option_b_nationalist_weight": 100,
    "option_b_nationalist_perspective": "Even",
    "option_b_unionist_weight": 100,
    "option_b_unionist_perspective": "Even",
    "option_c": "Option C (Representative of partial balance, + Nationalist)",
    "option_c_nationalist_weight": 80,
    "option_c_nationalist_perspective": "Lots of weight on this side",
    "option_c_unionist_weight": 20,
    "option_c_unionist_perspective": "A little weight on this side."
  }
]


describe('Scales Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  //TC01
  it('Page Contents Correctly Loaded', async () => {

    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    // Render the Scales component
    render(
      <Router>
        <Scales />
      </Router>
    );

    const scalesElement = await screen.findByText(/Balance Achieved/i);
    const bookshelfElement = await screen.findByAltText(/Bookshelf/i);

    expect(scalesElement).toBeInTheDocument();
    expect(bookshelfElement).toBeInTheDocument();
  })

  //TC02
  it('Issues are loaded from the DB via endpoint', async () => {
    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Render the Scales component
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the fetch call to happen
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('http://localhost:4000/issues');
    });
  });
});

  //TC03
  it('Issue Dialog opens upon clicking on a book', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );
  
    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  
    // simulate the click.
    const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
    fireEvent.click(bookDiv);
      
    // Use findBy to wait for the expected outcome.
    const issueDialogTitle = await screen.findByText(/Dummy Issue 1/);
    expect(issueDialogTitle).toBeInTheDocument();
  });


  //TC04
  it('Issue Dialog can be closed again', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );
  
    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
  
    // simulate the click.
    const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
    fireEvent.click(bookDiv);

    const closeButton = screen.getByLabelText(/closeIssueDialog/i);
    fireEvent.click(closeButton)

    expect(screen.queryByLabelText('Issue-Dialog')).not.toBeInTheDocument();
  });

  //TC05
  // it('Newspaper Popover correctly displays', async () => {
  //   fetchMock.mockResponseOnce(JSON.stringify(mockData));
  //   render(
  //     <Router>
  //       <Scales />
  //     </Router>
  //   );
  
  //   // Wait for the mock data to be fetched and the component to update.
  //   await waitFor(() => expect(fetch).toHaveBeenCalledTimes(4));
  
  //   // After ensuring the component has the data, simulate the click.
  //   const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
  //   fireEvent.click(bookDiv);

  //   const optionAButton = screen.getByRole('button', { name: 'optionA' });
  //   fireEvent.click(optionAButton)

  //   const nationalistNewspaper = await screen.getByLabelText(/nationalistIssue Dummy Issue 1/i);
  //   fireEvent.mouseOver(nationalistNewspaper);



  //   // 3. Assert that the popover content contains the desired text
  //   const popoverContent = screen.getByText(/Scales tipped totally in our favour/i);
  //   expect(popoverContent).toBeInTheDocument();
      
  // });

  it('Confirm Quit Dialog Opened When Home Icon Clicked', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(4));
  
    // simulate the click.
    const homeIcon = await screen.getByLabelText(/HomeIcon/i);
    fireEvent.click(homeIcon);

    const quitDialogTitle = await screen.findByText(/Are You Sure You Want to Quit?/);
    expect(quitDialogTitle).toBeInTheDocument();
  });

  it('Confirm Quit Dialog Closes When Cancel is Clicked', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(5));
  
    // simulate the click.
    const homeIcon = await screen.getByLabelText(/HomeIcon/i);
    fireEvent.click(homeIcon);

    const closeButton = screen.getByRole('button', { name: 'closeConfirmQuit' });
    fireEvent.click(closeButton)

    expect(screen.queryByLabelText('Confirm-Quit-Dialog')).not.toBeInTheDocument();
  });

  it('User is redirected Home When Quit is Clicked', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(6));
  
    // simulate the click.
    const homeIcon = await screen.getByLabelText(/HomeIcon/i);
    fireEvent.click(homeIcon);

    const linkElement = screen.getByRole('link', { name: /Quit/i });
    expect(linkElement).toBeInTheDocument();

    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe("/");
  });

  it('Settings Dialog Opened When Settings Icon Clicked', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <SoundProvider>
          <Scales />
        </SoundProvider>
      </Router>
    );

    // Wait for the mock data to be fetched 
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(7));
  
   // simulate the click.
    const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
    fireEvent.click(settingsIcon);

    const settingsDialogContent = await screen.findByText(/Admin/);
    expect(settingsDialogContent).toBeInTheDocument();
  });

  it('Settings Dialog Can Be Closed', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <SoundProvider>
          <Scales />
        </SoundProvider>
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(8));
  
    // simulate the click.
    const settingsIcon = await screen.getByLabelText(/SettingsIcon/i);
    fireEvent.click(settingsIcon);

    const closeButton = screen.getByRole('button', { name: 'closeSettings' });
    fireEvent.click(closeButton)

    expect(screen.queryByLabelText('Settings-Dialog')).not.toBeInTheDocument();
  });

  it('First Submission Progresses The Phase', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(9));
  
     // Find the submit button
      const submitButton = screen.getByLabelText(/SubmitIcon/i);
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1200)); 
      });

      await waitFor(() => {
        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toHaveTextContent('2020 Restoration Talks');
      });
  });

  it('Second Submission redirects user to Results', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(10));
  
     // Find the submit button
      const submitButton = screen.getByLabelText(/SubmitIcon/i);
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 1200)); 
      });

      fireEvent.click(submitButton);

      expect(window.location.pathname).toBe("/results");
  });


  it('Rotate Device Message Appears When Window Width < Height', async () => {
    window.innerWidth = 300;
    window.innerHeight = 400;

    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(11));
  
    const messageElement = screen.getByText(/Please rotate your device to landscape mode/i);
    expect(messageElement).toBeInTheDocument();
  });


    //-------------------------------------------------------------------- //
   //------------------------ ECP BLACK BOX TESTS ------------------------//
  //-------------------------------------------------------------------- //

  // ---------------------------- N1U5 ----------------------------//
  it('Nationalist Weight updates when completely outweighing UnionistWeight', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    );

    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(12));

    // simulate the click.
    const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
    fireEvent.click(bookDiv);
  
    // Find the select button for Option A
    const optionAButton = screen.getByLabelText('optionA');
    fireEvent.click(optionAButton);

    // Wait for the component to update
    await waitFor(() => {
      const nationalistWeight = screen.getByLabelText(/invisibleNationalistWeight/i).textContent;
      expect(Number(nationalistWeight)).toEqual(100);
    });
});

it('Unionist Weight updates when completely outweighed by Nationalist Weight', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  render(
    <Router>
      <Scales />
    </Router>
  ); 

  // Wait for the mock data to be fetched
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(13));

  // simulate the click.
  const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
  fireEvent.click(bookDiv);

  // Find the select button for Option A
  const optionAButton = screen.getByLabelText('optionA');
  fireEvent.click(optionAButton);

  // Wait for the component to update
  await waitFor(() => {
    const unionistWeight = screen.getByLabelText(/invisibleUnionistWeight/i).textContent;
    expect(Number(unionistWeight)).toEqual(0);
  });
});

it('Balance Percentage Correctly calculated when Nationalist side completely outweighs Unionist Side', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  render(
    <Router>
      <Scales />
    </Router>
  ); 

  // Wait for the mock data to be fetched
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(14));

  // simulate the click.
  const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
  fireEvent.click(bookDiv);

  // Find the select button for Option A
  const optionAButton = screen.getByLabelText('optionA');
  fireEvent.click(optionAButton);

  // Wait for the component to update
  await waitFor(() => {
    const balanceElement = screen.getByText(/% Balance Achieved/);
    expect(balanceElement.textContent).toMatch(/0(\.\d+)?% Balance Achieved/);
  });
});

it('Scales Update Correctly When Nationalist side completely outweighs Unionist Side', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  render(
    <Router>
      <Scales />
    </Router>
  ); 

  // Wait for the mock data to be fetched
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(15));

  // simulate the click.
  const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
  fireEvent.click(bookDiv);

  // Find the select button for Option A
  const optionAButton = screen.getByLabelText('optionA');
  fireEvent.click(optionAButton);

  // Wait for the component to update
  await waitFor(() => {
    const unionistScale = screen.getByLabelText('unionistBooks');
    const nationalistScale = screen.getByLabelText('nationalistBooks');

    // Assert that the heights of the scales represent the balance correctly
    expect(unionistScale).toHaveStyle({ height: '0%' });
    expect(nationalistScale).toHaveStyle({ height: '100%' });
  });
});


 // ---------------------------- N2U3 ----------------------------//

it('Unionist Weight updates when being partially outweighed', async () => {
fetchMock.mockResponseOnce(JSON.stringify(mockData));
render(
  <Router>
    <Scales />
  </Router>
); 

// Wait for the mock data to be fetched
await waitFor(() => expect(fetch).toHaveBeenCalledTimes(16));

// simulate the click.
const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 2/i });
fireEvent.click(bookDiv);

// Find the select button for Option C
const optionAButton = screen.getByLabelText('optionC');
fireEvent.click(optionAButton);

// Wait for the component to update
await waitFor(() => {
  const unionistWeight = screen.getByLabelText(/invisibleUnionistWeight/i).textContent;
  expect(Number(unionistWeight)).toEqual(20);
});
});

it('Balance Percentage Correctly calculated when Nationalist side partially outweighs Unionist Side', async () => {
fetchMock.mockResponseOnce(JSON.stringify(mockData));
render(
  <Router>
    <Scales />
  </Router>
); 

// Wait for the mock data to be fetched
await waitFor(() => expect(fetch).toHaveBeenCalledTimes(17));

// simulate the click.
const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 2/i });
fireEvent.click(bookDiv);

// Find the select button for Option c
const optionAButton = screen.getByLabelText('optionC');
fireEvent.click(optionAButton);

// Wait for the component to update
await waitFor(() => {
  const balanceElement = screen.getByText(/% Balance Achieved/);
  expect(balanceElement.textContent).toMatch(/24|25|26% Balance Achieved/);
});
});

it('Scales Update Correctly When Nationalist side partially outweighs Unionist Side', async () => {
fetchMock.mockResponseOnce(JSON.stringify(mockData));
render(
  <Router>
    <Scales />
  </Router>
); 

// Wait for the mock data to be fetched
await waitFor(() => expect(fetch).toHaveBeenCalledTimes(18));

// simulate the click.
const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 2/i });
fireEvent.click(bookDiv);

// Find the select button for Option A
const optionCButton = screen.getByLabelText('optionC');
fireEvent.click(optionCButton);

// Wait for the component to update
await waitFor(() => {
  const unionistScale = screen.getByLabelText('unionistBooks');
  const nationalistScale = screen.getByLabelText('nationalistBooks');

  // Assert that the heights of the scales represent the balance correctly
  expect(unionistScale).toHaveStyle({ height: '20%' });
  expect(nationalistScale).toHaveStyle({ height: '80%' });
});
});



 // ---------------------------- N3U2 ----------------------------//

 it('Balance Percentage Correctly calculated when Unionist side partially outweighs Nationalist Side', async () => {
  fetchMock.mockResponseOnce(JSON.stringify(mockData));
  render(
    <Router>
      <Scales />
    </Router>
  ); 
  
  // Wait for the mock data to be fetched
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(19));
  
  // simulate the click.
  const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
  fireEvent.click(bookDiv);
  
  // Find the select button for Option B
  const optionCButton = screen.getByLabelText('optionC');
  fireEvent.click(optionCButton);
  
  // Wait for the component to update
  await waitFor(() => {
    const balanceElement = screen.getByText(/% Balance Achieved/);
    expect(balanceElement.textContent).toMatch(/24|25|26% Balance Achieved/);
  });
  });

  it('Scales Update Correctly When Nationalist side partially outweighs Unionist Side', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Scales />
      </Router>
    ); 
    
    // Wait for the mock data to be fetched
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(20));
    
    // simulate the click.
    const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
    fireEvent.click(bookDiv);
    
    // Find the select button for Option B
    const optionCButton = screen.getByLabelText('optionC');
    fireEvent.click(optionCButton);
    
    // Wait for the component to update
    await waitFor(() => {
      const unionistScale = screen.getByLabelText('unionistBooks');
      const nationalistScale = screen.getByLabelText('nationalistBooks');
    
      // Assert that the heights of the scales represent the balance correctly
      expect(unionistScale).toHaveStyle({ height: '80%' });
      expect(nationalistScale).toHaveStyle({ height: '20%' });
    });
    });

    // ---------------------------- N4U4 ----------------------------//

    it('Balance Percentage Correctly calculated when perfect alance achieved', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(mockData));
      render(
        <Router>
          <Scales />
        </Router>
      ); 
      
      // Wait for the mock data to be fetched
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(21));
      
      // simulate the click.
      const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
      fireEvent.click(bookDiv);
      
      // Find the select button for Option B
      const optionBButton = screen.getByLabelText('optionB');
      fireEvent.click(optionBButton);
      
      // Wait for the component to update
      await waitFor(() => {
        const balanceElement = screen.getByText(/% Balance Achieved/);
        expect(balanceElement.textContent).toMatch(/99(\.\d+)?|100(\.\d+)?% Balance Achieved/);
      });
      });

      it('Scales Update Correctly When perfect balance achieved', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockData));
        render(
          <Router>
            <Scales />
          </Router>
        ); 
        
        // Wait for the mock data to be fetched
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(22));
        
        // simulate the click.
        const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 1/i });
        fireEvent.click(bookDiv);
        
        // Find the select button for Option B
        const optionBButton = screen.getByLabelText('optionB');
        fireEvent.click(optionBButton);
        
        // Wait for the component to update
        await waitFor(() => {
          const unionistScale = screen.getByLabelText('unionistBooks');
          const nationalistScale = screen.getByLabelText('nationalistBooks');
        
          // Assert that the heights of the scales represent the balance correctly
          expect(unionistScale).toHaveStyle({ height: '50%' });
          expect(nationalistScale).toHaveStyle({ height: '50%' });
        });
        });

        // ---------------------------- N5U1 ----------------------------//

        it('Nationalist Weight updates when completely outweighed by UnionistWeight', async () => {
          fetchMock.mockResponseOnce(JSON.stringify(mockData));
          render(
            <Router>
              <Scales />
            </Router>
          );
      
          // Wait for the mock data to be fetched
          await waitFor(() => expect(fetch).toHaveBeenCalledTimes(23));
      
          // simulate the click.
          const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 2/i });
          fireEvent.click(bookDiv);
        
          // Find the select button for Option A
          const optionAButton = screen.getByLabelText('optionA');
          fireEvent.click(optionAButton);
      
          // Wait for the component to update
          await waitFor(() => {
            const nationalistWeight = screen.getByLabelText(/invisibleNationalistWeight/i).textContent;
            expect(Number(nationalistWeight)).toEqual(0);
          });
      });

      it('Balance Percentage Correctly calculated when Unionist completely outweighs nationalist', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockData));
        render(
          <Router>
            <Scales />
          </Router>
        ); 
        
        // Wait for the mock data to be fetched
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(24));
        
        // simulate the click.
        const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 2/i });
        fireEvent.click(bookDiv);
        
        // Find the select button for Option A
        const optionAButton = screen.getByLabelText('optionA');
        fireEvent.click(optionAButton);
        
        // Wait for the component to update
        await waitFor(() => {
          const balanceElement = screen.getByText(/% Balance Achieved/);
          expect(balanceElement.textContent).toMatch(/0(\.\d+)?% Balance Achieved/);
        });
        });

        it('Scales Update Correctly When Unionist completely outweighs nationalist', async () => {
          fetchMock.mockResponseOnce(JSON.stringify(mockData));
          render(
            <Router>
              <Scales />
            </Router>
          ); 
          
          // Wait for the mock data to be fetched
          await waitFor(() => expect(fetch).toHaveBeenCalledTimes(25));
          
          // simulate the click.
          const bookDiv = await screen.findByRole('button', { name: /bookOnShelf Dummy Issue 2/i });
          fireEvent.click(bookDiv);
        
        // Find the select button for Option A
        const optionAButton = screen.getByLabelText('optionA');
        fireEvent.click(optionAButton);
          
          // Wait for the component to update
          await waitFor(() => {
            const unionistScale = screen.getByLabelText('unionistBooks');
            const nationalistScale = screen.getByLabelText('nationalistBooks');
          
            // Assert that the heights of the scales represent the balance correctly
            expect(unionistScale).toHaveStyle({ height: '100%' });
            expect(nationalistScale).toHaveStyle({ height: '0%' });
          });
          });