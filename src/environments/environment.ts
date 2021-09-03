// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    USERS_API: {
        API_STUDENTS:"http://localhost:8400/api/students",
        API_EMPLOYEES: "http://localhost:8400/api/",
        API_SKILLS: "http://localhost:8400/api/skills",
        API_INST: "http://localhost:8400/api/institution",

        API_ROOT:"http://localhost:8400/",

        API_ROOT_AUTH:"http://localhost:8400/api/auth/"
      },
    COURSES_API:{
        API_COURSES:"http://localhost:8400/api",
    },
    Teacher_API:{
        API_TEACHER:"http://localhost:8400/api/teachers",
    },
    Classroom_API:{
        API_CLASSROOM:"http://localhost:8400/api/classroom",
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
