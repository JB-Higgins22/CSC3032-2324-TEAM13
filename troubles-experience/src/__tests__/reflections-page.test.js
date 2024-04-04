// Import necessary utilities and component
import React from 'react';
import { render, waitFor, screen, fireEvent, act, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reflection from '../pages/reflection/reflection';
import fetchMock from 'jest-fetch-mock';
import { BrowserRouter as Router } from 'react-router-dom';

// Enable fetch mocking
fetchMock.enableMocks();

const mockData = [
    {
        "id": 1,
        "username": "User1",
        "location": "LocationA",
        "content": "Intrigued by the complexities of negotiation. Every voice carries weight."
    },
    {
        "id": 2,
        "username": "User2",
        "location": "LocationB",
        "content": "The puzzle shows compromise isn't easy but essential for peace."
    },
    {
        "id": 3,
        "username": "User3",
        "location": "LocationC",
        "content": "History teaches us the value of understanding. This tool brings perspectives to life."
    },
    {
        "id": 4,
        "username": "User4",
        "location": "LocationD",
        "content": "Reflection on past conflicts teaches hope for future resolutions."
    },
    {
        "id": 5,
        "username": "User5",
        "location": "LocationE",
        "content": "The scale of peace is delicate. Balancing it requires wisdom and patience."
    },
    {
        "id": 6,
        "username": "User6",
        "location": "LocationF",
        "content": "Learning about the Troubles through this puzzle added depth to my understanding."
    },
    {
        "id": 7,
        "username": "User7",
        "location": "LocationG",
        "content": "Empathy is key in conflict resolution. This interactive experience highlights that."
    },
    {
        "id": 8,
        "username": "User8",
        "location": "LocationH",
        "content": "The challenge of balancing diverse perspectives is eye-opening."
    },
    {
        "id": 9,
        "username": "User9",
        "location": "LocationI",
        "content": "This tool demonstrates the power of dialogue in overcoming differences."
    },
    {
        "id": 10,
        "username": "User10",
        "location": "LocationJ",
        "content": "Seeing both sides of the story has changed my perspective on the peace talks."
    },
    {
        "id": 11,
        "username": "User11",
        "location": "LocationA",
        "content": "Compromise feels like an art after using this puzzle. It’s complex and nuanced."
    },
    {
        "id": 12,
        "username": "User12",
        "location": "LocationB",
        "content": "The nuances of negotiation and the importance of every decision is well portrayed."
    },
    {
        "id": 13,
        "username": "User13",
        "location": "LocationC",
        "content": "A reminder that peace is a journey, not a destination. Each step matters."
    },
    {
        "id": 14,
        "username": "User14",
        "location": "LocationD",
        "content": "The interactive experience underlines the weight of historical context in resolutions."
    },
    {
        "id": 15,
        "username": "User15",
        "location": "LocationE",
        "content": "Engagement with the puzzle is a lesson in patience and empathy."
    },
    {
        "id": 16,
        "username": "User16",
        "location": "LocationF",
        "content": "Understanding comes from listening, and this puzzle forces us to listen."
    },
    {
        "id": 17,
        "username": "User17",
        "location": "LocationG",
        "content": "Reflecting on the peace talks, it's clear there are no easy answers, only hard-earned solutions."
    },
    {
        "id": 18,
        "username": "User18",
        "location": "LocationH",
        "content": "The interactive puzzle is a testament to the complexity of human emotions and politics."
    },
    {
        "id": 19,
        "username": "User19",
        "location": "LocationI",
        "content": "Realizing how intertwined issues are gives me new respect for negotiators."
    },
    {
        "id": 20,
        "username": "User20",
        "location": "LocationJ",
        "content": "This experience is a powerful reminder of the value of peace and the effort it requires."
    },
    {
        "id": 21,
        "username": "User21",
        "location": "LocationA",
        "content": "Every piece of the puzzle tells a story, a piece of history, a lesson to learn."
    },
    {
        "id": 22,
        "username": "User22",
        "location": "LocationB",
        "content": "Balance is elusive, but striving for it brings us closer to peace."
    },
    {
        "id": 23,
        "username": "User23",
        "location": "LocationC",
        "content": "The puzzle is a bridge between past conflicts and future hopes."
    },
    {
        "id": 24,
        "username": "User24",
        "location": "LocationD",
        "content": "Insights gained here are invaluable for understanding conflict dynamics."
    },
    {
        "id": 25,
        "username": "User25",
        "location": "LocationE",
        "content": "The interactivity adds a personal touch to historical events, making learning impactful."
    },
    {
        "id": 26,
        "username": "User26",
        "location": "LocationF",
        "content": "It’s a unique way to visualize the complexity of peace negotiations."
    },
    {
        "id": 27,
        "username": "User27",
        "location": "LocationG",
        "content": "Personal reflections on the Troubles through this puzzle are enlightening."
    },
    {
        "id": 28,
        "username": "User28",
        "location": "LocationH",
        "content": "Finding balance in the puzzle mirrors the real challenges of peace processes."
    },
    {
        "id": 29,
        "username": "User29",
        "location": "LocationI",
        "content": "This tool serves as a reminder that progress often comes from compromise."
    },
    {
        "id": 30,
        "username": "User30",
        "location": "LocationJ",
        "content": "Engagement with historical issues through this puzzle fosters deep reflection."
    },
    {
        "id": 31,
        "username": "User31",
        "location": "LocationA",
        "content": "The diversity of perspectives presented challenges preconceived notions."
    },
    {
        "id": 32,
        "username": "User32",
        "location": "LocationB",
        "content": "A creative approach to understanding the art of negotiation and peace."
    },
    {
        "id": 33,
        "username": "User33",
        "location": "LocationC",
        "content": "This experience emphasizes the importance of every voice in the conversation."
    },
    {
        "id": 34,
        "username": "User34",
        "location": "LocationD",
        "content": "The puzzle highlights the difficulty of achieving consensus. It’s a valuable lesson."
    },
    {
        "id": 35,
        "username": "User35",
        "location": "LocationE",
        "content": "I appreciate the emphasis on the complexity of historical conflicts and resolutions."
    },
    {
        "id": 36,
        "username": "User36",
        "location": "LocationF",
        "content": "Through this puzzle, the concept of peace is demystified yet shown to be complex."
    },
    {
        "id": 37,
        "username": "User37",
        "location": "LocationG",
        "content": "The interplay of different issues in the peace talks is well represented."
    },
    {
        "id": 38,
        "username": "User38",
        "location": "LocationH",
        "content": "It’s enlightening to see the peace process from multiple angles."
    },
    {
        "id": 39,
        "username": "User39",
        "location": "LocationI",
        "content": "This interactive tool brings to light the intricate dance of diplomacy."
    },
    {
        "id": 40,
        "username": "User40",
        "location": "LocationJ",
        "content": "Reflecting through the puzzle, understanding is the first step towards resolution."
    },
    {
        "id": 41,
        "username": "User41",
        "location": "LocationA",
        "content": "The puzzle portrays the fragility of peace and the strength needed to achieve it."
    },
    {
        "id": 42,
        "username": "User42",
        "location": "LocationB",
        "content": "I gained new insights into the challenges of reconciling diverse perspectives."
    },
    {
        "id": 43,
        "username": "User43",
        "location": "LocationC",
        "content": "The experience is a poignant reminder of the long road to peace."
    },
    {
        "id": 44,
        "username": "User44",
        "location": "LocationD",
        "content": "This interactive puzzle is a microcosm of the broader peace process."
    },
    {
        "id": 45,
        "username": "User45",
        "location": "LocationE",
        "content": "It’s fascinating to engage with the historical and political intricacies of the Troubles."
    },
    {
        "id": 46,
        "username": "User46",
        "location": "LocationF",
        "content": "The puzzle piece of dialogue in peacebuilding is crucial. This tool illustrates that beautifully."
    },
    {
        "id": 47,
        "username": "User47",
        "location": "LocationG",
        "content": "Seeing the balance of issues fluctuate in the puzzle is a powerful visual of peace efforts."
    },
    {
        "id": 48,
        "username": "User48",
        "location": "LocationH",
        "content": "This form of interactive learning about the Troubles is innovative and engaging."
    },
    {
        "id": 49,
        "username": "User49",
        "location": "LocationI",
        "content": "The puzzle emphasizes that while balance is ideal, it’s the pursuit that truly matters."
    },
    {
        "id": 50,
        "username": "User50",
        "location": "LocationJ",
        "content": "Engaging with the puzzle, I feel more connected to the historical significance of the peace talks."
    },
    {
        "id": 51,
        "username": "User51",
        "location": "LocationA",
        "content": "This tool effectively simulates the delicate balancing act of peace negotiations."
    },
    {
        "id": 52,
        "username": "User52",
        "location": "LocationB",
        "content": "A compelling way to explore the intricate dynamics of the Troubles and peace efforts."
    },
    {
        "id": 53,
        "username": "User53",
        "location": "LocationC",
        "content": "The puzzle enhances understanding of the multifaceted nature of conflict resolution."
    },
    {
        "id": 54,
        "username": "User54",
        "location": "LocationD",
        "content": "By participating, I’ve seen the critical role of empathy in the peace process."
    },
    {
        "id": 55,
        "username": "User55",
        "location": "LocationE",
        "content": "The puzzle’s interactive nature makes the history of the Troubles personally relevant."
    },
    {
        "id": 56,
        "username": "User56",
        "location": "LocationF",
        "content": "Insight into the peace talks process through this puzzle is uniquely informative."
    },
    {
        "id": 57,
        "username": "User57",
        "location": "LocationG",
        "content": "The challenge of finding balance in the puzzle mirrors real-world peace negotiations."
    },
    {
        "id": 58,
        "username": "User58",
        "location": "LocationH",
        "content": "This interactive experience deepens appreciation for the complexities of peacebuilding."
    },
    {
        "id": 59,
        "username": "User59",
        "location": "LocationI",
        "content": "A novel way to engage with and reflect on the historical context of the Troubles."
    },
    {
        "id": 60,
        "username": "User60",
        "location": "LocationJ",
        "content": "The puzzle provides a tangible sense of the challenges faced during the peace talks."
    },
    {
        "id": 61,
        "username": "User61",
        "location": "LocationA",
        "content": "Exploring the puzzle, I'm struck by the perseverance needed for peace."
    },
    {
        "id": 62,
        "username": "User62",
        "location": "LocationB",
        "content": "This experience offers a unique lens on the delicate art of conflict resolution."
    },
    {
        "id": 63,
        "username": "User63",
        "location": "LocationC",
        "content": "The interactive puzzle sheds light on the nuanced negotiations of the peace talks."
    },
    {
        "id": 64,
        "username": "User64",
        "location": "LocationD",
        "content": "A thought-provoking tool that highlights the importance of compromise and dialogue."
    },
    {
        "id": 65,
        "username": "User65",
        "location": "LocationE",
        "content": "The puzzle’s reflection on the Troubles offers a profound learning experience."
    },
    {
        "id": 66,
        "username": "User66",
        "location": "LocationF",
        "content": "Understanding the layers of conflict and resolution through this puzzle is enlightening."
    }
]

describe('Reflections Component', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });
  
    //TC01
    it('Page Contents Correctly Loaded', async () => {

        // Mock the fetch response
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );
  
        const reflectionForm = await screen.findByLabelText(/reflection-form/i);
        const wordCloud = screen.queryByLabelText('word-cloud');
        const reflectionGrid = screen.queryByLabelText('reflection-grid');
        const refreshButton = screen.queryByLabelText('refresh-button');
  
        expect(reflectionForm).toBeInTheDocument();
        expect(wordCloud).not.toBeInTheDocument();
        expect(reflectionGrid).not.toBeInTheDocument();
        expect(refreshButton).not.toBeInTheDocument();

    })

    //TC02
    it('Leaving a Reflection', async () => {

        // Mock the fetch response
        fetchMock.mockResponses(
            [JSON.stringify(mockData), { status: 200 }], // Response for the GET request
            [JSON.stringify({ success: true }), { status: 200 }] // Response for the POST request
        );

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:4000/getapprovedreflections');
  
        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Your Name'), {
            target: { value: 'Example-y McExampleface' },
        });
        fireEvent.change(screen.getByPlaceholderText('Where are you from?'), {
            target: { value: 'Anywhere' },
        });
        fireEvent.change(screen.getByPlaceholderText('Share your thoughts...'), {
            target: { value: 'This is a reflection.' },
        });

        // Submit the form
        await act(async () => {
            fireEvent.click(screen.getByText('Submit'));
        });

        // Assertions for the POST request
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
        expect(fetchMock.mock.calls[1][0]).toEqual('http://localhost:4000/addreflection');
        expect(fetchMock.mock.calls[1][1]).toEqual(expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                userName: 'Example-y McExampleface',
                userLocation: 'Anywhere',
                userReflection: 'This is a reflection.'
            }),
        }));

    })

    //TC03
    it('Leaving name blank', async () => {

        // Mock the fetch response
        fetchMock.mockResponses(
            [JSON.stringify(mockData), { status: 200 }], // Response for the GET request
            [JSON.stringify({ success: true }), { status: 200 }] // Response for the POST request
        );

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:4000/getapprovedreflections');
  
        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Where are you from?'), {
            target: { value: 'Anywhere' },
        });
        fireEvent.change(screen.getByPlaceholderText('Share your thoughts...'), {
            target: { value: 'This is a reflection.' },
        });

        expect(screen.getByPlaceholderText('Your Name').validity.valid).toBe(false);
    })

    //TC04
    it('Leaving location blank', async () => {

        // Mock the fetch response
        fetchMock.mockResponses(
            [JSON.stringify(mockData), { status: 200 }], // Response for the GET request
            [JSON.stringify({ success: true }), { status: 200 }] // Response for the POST request
        );

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:4000/getapprovedreflections');
  
        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Your Name'), {
            target: { value: 'Example-y McExampleface' },
        });
        fireEvent.change(screen.getByPlaceholderText('Share your thoughts...'), {
            target: { value: 'This is a reflection.' },
        });

        expect(screen.getByPlaceholderText('Where are you from?').validity.valid).toBe(false);
    })

    //TC05
    it('Leaving reflection blank', async () => {

        // Mock the fetch response
        fetchMock.mockResponses(
            [JSON.stringify(mockData), { status: 200 }], // Response for the GET request
            [JSON.stringify({ success: true }), { status: 200 }] // Response for the POST request
        );

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:4000/getapprovedreflections');
  
        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Your Name'), {
            target: { value: 'Example-y McExampleface' },
        });
        fireEvent.change(screen.getByPlaceholderText('Where are you from?'), {
            target: { value: 'Anywhere' },
        });

        expect(screen.getByPlaceholderText('Share your thoughts...').validity.valid).toBe(false);
    })

    //TC06
    it('Remaining Character Counter Updates Correctly', async () => {

        // Mock the fetch response
        fetchMock.mockResponses(
            [JSON.stringify(mockData), { status: 200 }], // Response for the GET request
            [JSON.stringify({ success: true }), { status: 200 }] // Response for the POST request
        );

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:4000/getapprovedreflections');
  
        let remainingCharacterCounter = screen.getByText('0 / 250');
        expect(remainingCharacterCounter).toBeInTheDocument;
        

        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Share your thoughts...'), {
            target: { value: 'This is an example of a generated sentence that aims to closely match the requested length of 100...' },
        });

        remainingCharacterCounter = screen.getByText('100 / 250');
        expect(remainingCharacterCounter).toBeInTheDocument;
        
        fireEvent.change(screen.getByPlaceholderText('Share your thoughts...'), {
            target: { value: 'This sentence is specifically crafted to achieve a length of approximately 250 characters. It serves as an example of how to construct a longer piece of text while maintaining coherence and relevance to the given task.................................' },
        });

        remainingCharacterCounter = screen.getByText('250 / 250');
        expect(remainingCharacterCounter).toBeInTheDocument;
    })

    //TC07
    it('Clicking Submit on a validated form', async () => {

        // Mock the fetch response
        fetchMock.mockResponses(
            [JSON.stringify(mockData), { status: 200 }], // Response for the GET request
            [JSON.stringify({ success: true }), { status: 200 }] // Response for the POST request
        );

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:4000/getapprovedreflections');
  
        // Mock user input
        fireEvent.change(screen.getByPlaceholderText('Your Name'), {
            target: { value: 'Example-y McExampleface' },
        });
        fireEvent.change(screen.getByPlaceholderText('Where are you from?'), {
            target: { value: 'Anywhere' },
        });
        fireEvent.change(screen.getByPlaceholderText('Share your thoughts...'), {
            target: { value: 'This is a reflection.' },
        });

        // Submit the form
        await act(async () => {
            fireEvent.click(screen.getByText('Submit'));
        });

        // Assertions for the POST request
        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
        expect(fetchMock.mock.calls[1][0]).toEqual('http://localhost:4000/addreflection');
        expect(fetchMock.mock.calls[1][1]).toEqual(expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({
                userName: 'Example-y McExampleface',
                userLocation: 'Anywhere',
                userReflection: 'This is a reflection.'
            }),
        }));

        const reflectionForm = await screen.findByLabelText(/reflection-form/i);
        const wordCloud = screen.queryByLabelText('word-cloud');
        const reflectionGrid = screen.queryByLabelText('reflection-grid');
        const refreshButton = screen.queryByLabelText('refresh-button');

        setTimeout(() => {              // Simulate the timeout when refreshing the page contents
            expect(reflectionForm).not.toBeInTheDocument();
            expect(wordCloud).toBeInTheDocument();
            expect(reflectionGrid).toBeInTheDocument();
            expect(refreshButton).toBeInTheDocument();
          }, 1200);
    })


    //TC08
    it('User opts not to leave a reflection', async () => {

        // Mock the fetch response
        fetchMock.mockResponses(
            [JSON.stringify(mockData), { status: 200 }], // Response for the GET request
            [JSON.stringify({ success: true }), { status: 200 }] // Response for the POST request
        );

        // Render the Reflection component
        render(
            <Router>
                <Reflection />
             </Router>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
        expect(fetchMock.mock.calls[0][0]).toEqual('http://localhost:4000/getapprovedreflections');

        // Submit the form
        await act(async () => {
            fireEvent.click(screen.getByText(/I Don't Want To Leave a Reflection/i));
        });

        const reflectionForm = await screen.findByLabelText(/reflection-form/i);
        const wordCloud = screen.queryByLabelText('word-cloud');
        const reflectionGrid = screen.queryByLabelText('reflection-grid');
        const refreshButton = screen.queryByLabelText('refresh-button');

        setTimeout(() => {              // Simulate the timeout when refreshing the page contents
            expect(reflectionForm).not.toBeInTheDocument();
            expect(wordCloud).toBeInTheDocument();
            expect(reflectionGrid).toBeInTheDocument();
            expect(refreshButton).toBeInTheDocument();
          }, 1200);
    })
});