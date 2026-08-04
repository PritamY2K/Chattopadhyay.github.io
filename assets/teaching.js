(() => {
  const catalogue = Array.isArray(window.COURSE_CATALOGUE) ? window.COURSE_CATALOGUE : [];
  const courseNameFilter = document.querySelector('#course-name-filter');
  const courseTypeFilter = document.querySelector('#course-type-filter');
  const semesterFilter = document.querySelector('#semester-filter');
  const searchInput = document.querySelector('#paper-search');
  const resetButton = document.querySelector('#reset-filters');
  const catalogueElement = document.querySelector('#course-catalogue');
  const emptyElement = document.querySelector('#course-empty');
  const summaryElement = document.querySelector('#results-summary');

  if (!catalogueElement || !courseNameFilter || !courseTypeFilter || !semesterFilter || !searchInput) return;

  const romanOrder = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };
  const unique = (items) => [...new Set(items)].sort((a, b) => {
    const aRoman = romanOrder[a.replace('Semester ', '')];
    const bRoman = romanOrder[b.replace('Semester ', '')];
    if (aRoman && bRoman) return aRoman - bRoman;
    return a.localeCompare(b, undefined, { numeric: true });
  });

  const makeOption = (value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    return option;
  };

  unique(catalogue.map((course) => course.courseName)).forEach((value) => courseNameFilter.append(makeOption(value)));
  unique(catalogue.map((course) => course.courseType)).forEach((value) => courseTypeFilter.append(makeOption(value)));

  const updateDependentOptions = () => {
    const selectedName = courseNameFilter.value;
    const selectedType = courseTypeFilter.value;
    const currentSemester = semesterFilter.value;

    const matching = catalogue.filter((course) =>
      (selectedName === 'all' || course.courseName === selectedName) &&
      (selectedType === 'all' || course.courseType === selectedType)
    );

    const semesters = unique(matching.map((course) => course.semester));
    semesterFilter.innerHTML = '<option value="all">All semesters</option>';
    semesters.forEach((value) => semesterFilter.append(makeOption(value)));
    if (semesters.includes(currentSemester)) semesterFilter.value = currentSemester;
  };

  const resourceMarkup = (resource) => {
    const isLive = Boolean(resource.href) && resource.status !== 'coming-soon';
    if (isLive) {
      const external = /^https?:\/\//i.test(resource.href);
      return `<a class="resource-link" href="${resource.href}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}><span class="resource-type">${resource.type}</span><span>${resource.label}</span><b>Open ↗</b></a>`;
    }
    return `<span class="resource-link disabled" aria-disabled="true"><span class="resource-type">${resource.type}</span><span>${resource.label}</span><b>Coming soon</b></span>`;
  };

  const cardMarkup = (course) => `
    <article class="course-card reveal visible">
      <div class="course-card-header">
        <div>
          <p class="course-programme">${course.courseName} · ${course.courseType} · ${course.semester}</p>
          <h3>${course.title}</h3>
        </div>
        <span class="course-code">${course.code}</span>
      </div>
      <p class="course-description">${course.description}</p>
      <div class="tag-row">${(course.topics || []).map((topic) => `<span>${topic}</span>`).join('')}</div>
      <div class="resource-list">${(course.resources || []).map(resourceMarkup).join('')}</div>
    </article>`;

  const render = () => {
    const courseName = courseNameFilter.value;
    const courseType = courseTypeFilter.value;
    const semester = semesterFilter.value;
    const query = searchInput.value.trim().toLowerCase();

    const filtered = catalogue.filter((course) => {
      const nameMatch = courseName === 'all' || course.courseName === courseName;
      const typeMatch = courseType === 'all' || course.courseType === courseType;
      const semesterMatch = semester === 'all' || course.semester === semester;
      const haystack = [course.courseName, course.courseType, course.semester, course.code, course.title, course.description, ...(course.topics || [])].join(' ').toLowerCase();
      return nameMatch && typeMatch && semesterMatch && (!query || haystack.includes(query));
    });

    catalogueElement.innerHTML = filtered.map(cardMarkup).join('');
    emptyElement.hidden = filtered.length !== 0;
    summaryElement.textContent = `${filtered.length} paper${filtered.length === 1 ? '' : 's'} shown`;
  };

  courseNameFilter.addEventListener('change', () => { updateDependentOptions(); render(); });
  courseTypeFilter.addEventListener('change', () => { updateDependentOptions(); render(); });
  semesterFilter.addEventListener('change', render);
  searchInput.addEventListener('input', render);

  resetButton?.addEventListener('click', () => {
    courseNameFilter.value = 'all';
    courseTypeFilter.value = 'all';
    updateDependentOptions();
    semesterFilter.value = 'all';
    searchInput.value = '';
    render();
  });

  updateDependentOptions();
  render();
})();
