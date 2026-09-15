# Teaching Materials Management Guide

The teaching catalogue is controlled by `assets/courses.js`.

Each catalogue entry contains:

- Course name
- Course type
- Semester
- Paper code
- Paper name
- Short description and topic tags
- Links to class notes, question banks, syllabi and lecture presentations

## Suggested folder structure

```text
materials/
└── bsc-botany/
    ├── semester-i/
    │   ├── botn-1011-1021/
    │   └── botn-1051/
    ├── semester-ii/
    ├── semester-iii/
    ├── semester-iv/
    ├── semester-v/
    ├── semester-vi/
    ├── semester-vii/
    └── semester-viii/
```

After uploading a study file, add its relative path to the relevant `href` field in `assets/courses.js` and change its status from `coming-soon` to `available`.

Example:

```javascript
{
  label: "Class notes",
  type: "PDF",
  href: "materials/bsc-botany/semester-iv/botn-4011/class-notes.pdf",
  status: "available"
}
```
