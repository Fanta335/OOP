class Employee{
  private mainJob!: Company;
  private secondJob?: Company;

  constructor(mainJob: Company, secondJob?:Company){
    this.mainJob = mainJob;
    this.secondJob = secondJob;
  }
}

class Company{
  private employees: Employee[];
  private boardMember: BoardMember[];

  private parentCompany?: Company[];
  private subsidiaries: Company[];

  constructor(employees: Employee[], boardMember: BoardMember[], subsidiaries: Company[],parentCompany?: Company[]){
    this.employees = employees;
    this.boardMember = boardMember;
    this.parentCompany = parentCompany;
    this.subsidiaries = subsidiaries;
  }
}

class BoardMember {
  private companiesManaging:Company[];

  constructor(companies: Company[]){
    this.companiesManaging = companies;
  }
}
