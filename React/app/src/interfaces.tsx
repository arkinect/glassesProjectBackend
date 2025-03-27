// interface for prescription
interface EyePrescription {
    sphere: number | null;
    cylinder: number | null;
    axis: number | null;
    prism: number | null;
    base: string | null;
}
  
export interface Prescription {
    leftEye: EyePrescription;
    rightEye: EyePrescription;
}

// interfaces for different sets of post information
interface Image {
    id: number,
    imagePath: string,
}

export interface DetailedPosting {
    comment: string,
    contact?: string | null,
    flagged: boolean,
    location: string,
    pictures? : Image[],
    postNumb: number,
    prescription?: Prescription | null,
    pseudoPrescription?: number | null,
    user: string,
}

export interface Posting {
    postNumb: number,
    location: string,
    sphere: number,
    flagged: boolean,
    imageCard: string,
}

export interface NewPostForm {
    prescription: Prescription;
    pseudoPrescription: number | null;
    comment: string | null;
    location: string;
    contact: string;
}