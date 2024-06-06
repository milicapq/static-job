let jobFilters = [];

function filtersHandler(cbs) {
    let jobFilters = []

    const addFilter = (filter) => {
        if (jobFilters.indexOf(filter) < 0) {
            jobFilters.push(filter)
            cbs.forEach(cb => cb(jobFilters))
        }
    }
    const removeFilter = (filter) => {
        jobFilters = jobFilters.filter(f => f !== filter)
        cbs.forEach(cb => cb(jobFilters))
    }
    const resetFilters = () => {
        jobFilters = []
        cbs.forEach(cb => cb(jobFilters))
    }
    return {
        addFilter,
        removeFilter,
        resetFilters
    }
}

const main = document.querySelector('main');
const { addFilter, removeFilter, resetFilters } = filtersHandler([filterJobs, renderFilters])
function cards({
    company,
    logo,
    featured,
    newJob,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
    id,
}) {
    createNode(
        {
            tag: 'div',
            classList: ['header'],
        },
        document.querySelector('main')
    );

    const card = createNode(
        { id, tag: 'div', classList: ['card'], data: featured || null },
        main
    );

    const leftSide = createNode(
        {
            tag: 'div',
            classList: ['leftSide'],
        },
        card
    );

    createNode(
        {
            tag: 'img',
            src: logo,
            classList: ['logo'],
        },
        leftSide
    );

    const data = createNode(
        {
            tag: 'div',
            classList: ['data'],
        },
        leftSide
    );

    const dataHeader = createNode(
        {
            tag: 'div',
            classList: ['dataHeader'],
        },
        data
    );

    createNode(
        {
            tag: 'p',
            textContent: company,
            classList: ['company'],
        },
        dataHeader
    );

    if (newJob) {
        createNode(
            {
                tag: 'div',
                classList: ['newBtn'],
                textContent: 'NEW!',
            },
            dataHeader
        );
    }

    if (featured) {
        createNode(
            {
                tag: 'div',
                classList: ['featuredBtn'],
                textContent: 'FEATURED',
            },
            dataHeader
        );
    }

    createNode(
        {
            tag: 'p',
            textContent: position,
            classList: ['position'],
        },
        data
    );

    const contractData = createNode(
        {
            tag: 'div',
            classList: ['contractData'],
        },
        data
    );

    createNode(
        {
            tag: 'p',
            textContent: postedAt,
        },
        contractData
    );

    createNode(
        {
            tag: 'div',
            classList: ['oval'],
        },
        contractData
    );

    createNode(
        {
            tag: 'p',
            textContent: contract,
        },
        contractData
    );

    createNode(
        {
            tag: 'div',
            classList: ['oval'],
        },
        contractData
    );

    createNode(
        {
            tag: 'p',
            textContent: location,
        },
        contractData
    );

    createNode(
        {
            tag: 'div',
            classList: ['line'],
        },
        card
    );

    const rightSide = createNode(
        {
            tag: 'div',
            classList: ['rightSide'],
        },
        card
    );

    const tags = createNode(
        {
            tag: 'div',
            classList: ['tags'],
        },
        rightSide
    );

    const buttons = createNode({ tag: 'div' }, tags);

    [role, level, ...languages, ...tools].forEach((language) => {
        const button = createNode(
            { tag: 'button', textContent: language },
            buttons
        );
        button.addEventListener('click', function (e) {
            addFilter(language)
        });
    });
}

function renderCards(data) {
    document.querySelector('main').innerHTML = ''
    data.forEach(cards)
}

renderCards(data)

function renderFilters(filters) {
    const contentBox = document.querySelector('.filterBox');
    contentBox.innerHTML = '';
    filters.forEach((filter) => {
        const box = createNode(
            {
                tag: 'div',
                classList: ['filter'],
            },
            contentBox
        );

        const btn = createNode(
            {
                tag: 'div',
                classList: ['btn'],
            },
            box
        );
        btn.addEventListener('click', function (e) {
            removeFilter(filter)
        });

        createNode(
            {
                tag: 'button',
                classList: ['closeTagFrontend'],
                textContent: filter,
            },
            btn
        );

        createNode(
            {
                tag: 'img',
                src: './images/icon-remove.svg',
                classList: ['close'],
            },
            btn
        );
    });
}

const clearContent = document.querySelector('.clearBtn');
clearContent.addEventListener('click', function (e) {
    resetFilters()
})

const filtersMap = {
    Frontend: 'role',
    Senior: 'level',
    HTML: 'languages',
    CSS: 'languages',
    JavaScript: 'languages',
    Fullstack: 'role',
    Midweight: 'level',
    Python: 'languages',
    React: 'tools',
    Junior: 'level',
    Sass: 'tools',
    Ruby: 'languages',
    Backend: 'role',
    RoR: 'tools',
    Vue: 'tools',
    Django: 'tools',
};
function filterJobs(activeFilters) {
    let allJobs = [...data];
    activeFilters.forEach((filter) => {
        const keyInJob = filtersMap[filter];
        if (keyInJob === 'role' || keyInJob === 'level') {
            allJobs = allJobs.filter((job) => job[keyInJob] === filter);
        } else {
            allJobs = allJobs.filter((job) => job[keyInJob].indexOf(filter) >= 0);
        }
    });
    renderCards(allJobs)
}
