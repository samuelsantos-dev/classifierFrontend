import { DocumentDTO } from "src/app/users/models/document-dto";

export default class Utils {
    
     static toFormData(document: DocumentDTO): FormData {
        const formData = new FormData();
        formData.append('file', document.file.slice(), document.file.name);
        return formData;
      }
}
