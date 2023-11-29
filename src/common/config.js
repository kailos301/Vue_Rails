export const SERVER_URL = "http://localhost:3000/api/"; //localhost:3000/api/admin/users/
export const URLS = {
  admin: {
    users: 'admin/users',
    groups: 'admin/groups',
    fields: {groups: 'admin/field_groups', field: 'admin/fields'},
    tags: 'admin/tags',
  },
  user: {
    leads: 'entities/leads'
  }
}
export const THEME_SETTING = {
  sidebarMini: true,
  sidebarImg: true,
  sidebarColors: [
    { color: 'gray', active: false },
    { color: 'black', active: true },
    { color: "purple", active: false },
    { color: "azure", active: false },
    { color: "green", active: false },
    { color: "orange", active: false },
    { color: "rose", active: false },
    { color: "danger", active: false }
  ],
  sidebarBgs: [
    { colorBg: "black", active: true },
    { colorBg: "white", active: false },
    { colorBg: "red", active: false }
  ],
  sidebarImages: [
    { image: "./img/sidebar-1.jpg", active: false },
    { image: "./img/sidebar-2.jpg", active: true },
    { image: "./img/sidebar-3.jpg", active: false },
    { image: "./img/sidebar-4.jpg", active: false }
  ],
}
export const MIN_LEN = {
  pass: 6, name: 3, 
  title: 3, company: 3,
  tag: 3,
}
export const ADMIN_FIELD_AS = {
  'Short Answer': 'string' , 
  'Long Answer': 'text', 
  'Email, Address': 'email', 
  'Url': 'url', 
  'Phone Number': 'tel',
  'Select List': 'select', 
  'Radio Buttons': 'radio_button', 
  'CheckBox List': 'check_boxes', 'Checkbox': 'boolean', 
  'Date': 'date', 'Date & Time':  'datetime', 
  'Number(Decimal)': 'decimal', 'Number(Integer)': 'integer', 'Number(Floating Point)': 'float', 
  'Date Pair': 'date_pair', 'Date & Time Pair': 'datetime_pair'
}
export const AF_FORM_HIDDEN = {
  radio_button: ['maxlength', 'minlength', 'placeholde'], 
  date: ['maxlength', 'minlength', 'placeholde'], 
  datetime: ['maxlength', 'minlength', 'placeholde'],
  decimal: ['maxlength', 'minlength', 'placeholde'], 
}
export const USER = {
  lead: ['Prospecting', 'Analysis', 'Presentation', 'Proposal', 'Negotiation', 'Final Review', 'Closed/Won', 'Cloesd/Lost'],
}




