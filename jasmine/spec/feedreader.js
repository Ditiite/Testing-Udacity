/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 
        * Checks if the url is defined and if it's not empty 
        */
        it('check if url is defined and not empty', () => {
            allFeeds.forEach(feed => {
                // Check if url is defined
                expect(feed.url).toBeDefined();
                // Check that url is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* 
        *  Checks if the name of url is defined and if it's not empty
        */
        it('check if name is defined and not empty', () => {
            allFeeds.forEach(feed => {
                // Check if name is defined
                expect(feed.name).toBeDefined();
                // Check that name is not empty
                expect(feed.name.length).not.toBe(0);
            })
        })

    });


    /* New test suite named "The menu" */
    describe('The menu', () => {
        // Select the required element
        const body = document.querySelector('body');

        /*
        * Check if the side-menu by default is hidden 
        */
        it('is hidden by default', () => {
            expect(body.className).toContain('menu-hidden');
        });

        /* 
        * Check that when the menu icon is clicked, 
        * side-menu performs showwing and hiding the siode-menu
        */
        it('works on click', () => {
            const menuIcon = $('.menu-icon-link');

            // Check if menu-hidden class is removed on click
            menuIcon.click();
            expect(body.className).not.toContain('menu-hidden');

            // Check if menu-hidden class is added on click
            menuIcon.click();
            expect(body.className).toContain('menu-hidden');
        });
    });

    /* New test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /*
        * Check if when loadFeed function is called there is at least one entry.
        */
        beforeEach(done => {
            loadFeed(0, () => {
                done();
            });
        });

        it('check if after loadFeed function is called there is at least one entry', (done) => {
            const container = document.querySelector('.feed');
            const entriesLength = container.querySelectorAll('.entry').length;

            expect(entriesLength).not.toBe(0);
            done();
        });

    });

    /* New test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        let currentContentUrl,
            nextContentUrl,
            currentContentHTML,
            nextContentHTML;

        const container = document.querySelector('.feed');

        /* 
         * Check if the content for new feed changes
         */
        beforeEach(done => {
            // Empty the prev.entries
            $('.feed').empty();
            
            loadFeed(0, () => {
                currentContentUrl = allFeeds[0].url;
                currentContentHTML = container.innerHTML;
                done();
            });

            loadFeed(3, () => {
                nextContentUrl = allFeeds[1].url;
                nextContentHTML = container.innerHTML;
                done();
            });
        });

        it('when the new feed is loaded the content of it is changed', () => {
            expect(currentContentUrl).not.toBe(nextContentUrl);
            expect(currentContentHTML).not.toBe(nextContentHTML);
        })

    });
}());
