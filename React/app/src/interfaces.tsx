// prescription interface
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