//Duration is in minutes
export function getOtpExpiry(duration:number): Date {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);
    return expiry;
}