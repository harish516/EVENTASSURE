// import { ApiService } from "./api.service";
// import { PersonListModel } from '../model/person-list.model';

// let httpClientSpy: { get: jasmine.Spy };
// let apiService: ApiService;

// beforeEach(() => {
//   // TODO: spy on other methods too
//   httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
//   apiService = new ApiService(<any> httpClientSpy);
// });

// /** Testing Search Person method of APIService */
// it('Should return PersonListModel', () => {
//     const page = 1, size = 1, firstName = 'test', surname = 'test', sex = 'M';
//     const personList = apiService.searchPerson(page, size, firstName, surname, sex);
//     expect(personList instanceof PersonListModel).toBe(true, 'expected instance of PersonListModel')

//     apiService.searchPerson(page, size, firstName, surname, sex).subscribe(
//         people => {
//             expect(people instanceof PersonListModel).toBe(true, 'expected instance of PersonListModel');
//             expect(people.list).not.toEqual([], 'Person List cannot be null');
//         },
//         fail
//       );
// });