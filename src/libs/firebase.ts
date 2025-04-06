import { Analytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { FirebasePerformance, trace } from "firebase/performance";
import { getRemoteConfig, RemoteConfig } from "firebase/remote-config";
import { firebaseConfig } from "@/config";

export const firebaseApp = initializeApp(firebaseConfig);

// Firebase Analytics
let analytics: Analytics;
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  const func = async () => {
    const { getAnalytics } = await import("firebase/analytics");
    analytics = getAnalytics(firebaseApp);
  };
  func();
}
export { analytics };

// Firebase Remote Config

let remoteConfig: RemoteConfig;
if (typeof window !== "undefined") {
  remoteConfig = getRemoteConfig(firebaseApp);
  remoteConfig.settings.minimumFetchIntervalMillis = 60 * 1000; // Fetch interval (optional)
  remoteConfig.defaultConfig = { PRODUCTION_DOWN: false };
}
export { remoteConfig };

// Firebase Performance
let perf: FirebasePerformance;
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  const func = async () => {
    const { getPerformance } = await import("firebase/performance");
    perf = getPerformance(firebaseApp);
  };
  func();
}
export type FBMetric = {
  key: string;
  attributes?: { [key: string]: string };
};
export const metrics = async (metric: FBMetric, func: () => Promise<any>) => {
  if (!perf) {
    return;
  }
  const t = trace(perf, metric.key);
  if (metric.attributes) {
    Object.keys(metric.attributes).forEach((key) => {
      t.putAttribute(key, metric.attributes?.[key]!);
    });
  }
  t.start();
  try {
    const result = await func();
    t.putAttribute("status", "success");
    return result;
  } catch (error) {
    t.putAttribute("status", "error");
    t.putAttribute("error", String(error));
    throw error;
  } finally {
    t.stop();
  }
};
export { perf };

export const errorMap: { [name: string]: string } = {
  "auth/admin-restricted-operation":
    "Hoạt động này chỉ dành cho quản trị viên.",
  "auth/argument-error": "Lỗi đối số.",
  "auth/app-not-authorized":
    "Ứng dụng này không được ủy quyền để sử dụng khóa API này.",
  "auth/app-not-installed": "Ứng dụng không được cài đặt.",
  "auth/captcha-check-failed": "Kiểm tra CAPTCHA không thành công.",
  "auth/code-expired": "Mã đã hết hạn.",
  "auth/cordova-not-ready": "Cordova chưa sẵn sàng.",
  "auth/cors-unsupported": "Trình duyệt không hỗ trợ CORS.",
  "auth/credential-already-in-use": "Thông tin xác thực này đã được sử dụng.",
  "auth/custom-token-mismatch": "Mã thông báo tùy chỉnh không khớp.",
  "auth/requires-recent-login": "Yêu cầu đăng nhập gần đây.",
  "auth/dependent-sdk-initialized-before-auth":
    "SDK phụ thuộc được khởi tạo trước khi xác thực.",
  "auth/dynamic-link-not-activated": "Liên kết động chưa được kích hoạt.",
  "auth/email-change-needs-verification": "Thay đổi email cần được xác minh.",
  "auth/email-already-in-use": "Email này đã được sử dụng.",
  "auth/emulator-config-failed": "Cấu hình trình giả lập thất bại.",
  "auth/expired-action-code": "Mã hành động đã hết hạn.",
  "auth/cancelled-popup-request": "Yêu cầu cửa sổ bật lên bị hủy.",
  "auth/internal-error": "Lỗi nội bộ.",
  "auth/invalid-api-key": "Khóa API không hợp lệ.",
  "auth/invalid-app-credential": "Thông tin xác thực ứng dụng không hợp lệ.",
  "auth/invalid-app-id": "ID ứng dụng không hợp lệ.",
  "auth/invalid-user-token": "Mã người dùng không hợp lệ.",
  "auth/invalid-auth-event": "Sự kiện xác thực không hợp lệ.",
  "auth/invalid-cert-hash": "Mã băm chứng chỉ không hợp lệ.",
  "auth/invalid-verification-code": "Mã xác minh không hợp lệ.",
  "auth/invalid-continue-uri": "URI tiếp tục không hợp lệ.",
  "auth/invalid-cordova-configuration": "Cấu hình Cordova không hợp lệ.",
  "auth/invalid-custom-token": "Mã thông báo tùy chỉnh không hợp lệ.",
  "auth/invalid-dynamic-link-domain": "Tên miền liên kết động không hợp lệ.",
  "auth/invalid-email": "Email không hợp lệ.",
  "auth/invalid-emulator-scheme": "Sơ đồ trình giả lập không hợp lệ.",
  "auth/invalid-credential": "Thông tin xác thực không hợp lệ.",
  "auth/invalid-message-payload": "Nội dung thông báo không hợp lệ.",
  "auth/invalid-multi-factor-session": "Phiên đa yếu tố không hợp lệ.",
  "auth/invalid-oauth-client-id": "ID khách hàng OAuth không hợp lệ.",
  "auth/invalid-oauth-provider": "Nhà cung cấp OAuth không hợp lệ.",
  "auth/invalid-action-code": "Mã hành động không hợp lệ.",
  "auth/unauthorized-domain": "Tên miền không được ủy quyền.",
  "auth/wrong-password": "Mật khẩu không đúng.",
  "auth/invalid-persistence-type": "Loại lưu trữ không hợp lệ.",
  "auth/invalid-phone-number": "Số điện thoại không hợp lệ.",
  "auth/invalid-provider-id": "ID nhà cung cấp không hợp lệ.",
  "auth/invalid-recipient-email": "Email người nhận không hợp lệ.",
  "auth/invalid-sender": "Người gửi không hợp lệ.",
  "auth/invalid-verification-id": "ID xác minh không hợp lệ.",
  "auth/invalid-tenant-id": "ID người thuê không hợp lệ.",
  "auth/multi-factor-info-not-found": "Không tìm thấy thông tin đa yếu tố.",
  "auth/multi-factor-auth-required": "Yêu cầu xác thực đa yếu tố.",
  "auth/missing-android-pkg-name": "Thiếu tên gói Android.",
  "auth/missing-app-credential": "Thiếu thông tin xác thực ứng dụng.",
  "auth/auth-domain-config-required": "Yêu cầu cấu hình tên miền xác thực.",
  "auth/missing-verification-code": "Thiếu mã xác minh.",
  "auth/missing-continue-uri": "Thiếu URI tiếp tục.",
  "auth/missing-iframe-start": "Thiếu bắt đầu iframe.",
  "auth/missing-ios-bundle-id": "Thiếu ID gói iOS.",
  "auth/missing-or-invalid-nonce": "Thiếu hoặc nonce không hợp lệ.",
  "auth/missing-multi-factor-info": "Thiếu thông tin đa yếu tố.",
  "auth/missing-multi-factor-session": "Thiếu phiên đa yếu tố.",
  "auth/missing-phone-number": "Thiếu số điện thoại.",
  "auth/missing-verification-id": "Thiếu ID xác minh.",
  "auth/app-deleted": "Ứng dụng đã bị xóa.",
  "auth/account-exists-with-different-credential":
    "Tài khoản đã tồn tại với thông tin xác thực khác.",
  "auth/network-request-failed": "Yêu cầu mạng thất bại.",
  "auth/null-user": "Người dùng không hợp lệ.",
  "auth/no-auth-event": "Không có sự kiện xác thực.",
  "auth/no-such-provider": "Không có nhà cung cấp như vậy.",
  "auth/operation-not-allowed": "Hoạt động không được phép.",
  "auth/operation-not-supported-in-this-environment":
    "Hoạt động không được hỗ trợ trong môi trường này.",
  "auth/popup-blocked": "Cửa sổ bật lên bị chặn.",
  "auth/popup-closed-by-user": "Cửa sổ bật lên bị đóng bởi người dùng.",
  "auth/provider-already-linked": "Nhà cung cấp đã được liên kết.",
  "auth/quota-exceeded": "Đã vượt quá hạn mức.",
  "auth/redirect-cancelled-by-user": "Chuyển hướng bị hủy bởi người dùng.",
  "auth/redirect-operation-pending": "Chuyển hướng đang chờ xử lý.",
  "auth/rejected-credential": "Thông tin xác thực bị từ chối.",
  "auth/second-factor-already-in-use": "Yếu tố thứ hai đã được sử dụng.",
  "auth/maximum-second-factor-count-exceeded":
    "Đã vượt quá số lượng yếu tố thứ hai tối đa.",
  "auth/tenant-id-mismatch": "ID người thuê không khớp.",
  "auth/timeout": "Hết thời gian.",
  "auth/user-token-expired": "Mã người dùng đã hết hạn.",
  "auth/too-many-requests": "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
  "auth/unauthorized-continue-uri": "URI tiếp tục không được ủy quyền.",
  "auth/unsupported-first-factor": "Yếu tố đầu tiên không được hỗ trợ.",
  "auth/unsupported-persistence-type": "Loại lưu trữ không được hỗ trợ.",
  "auth/unsupported-tenant-operation":
    "Hoạt động không được hỗ trợ của người thuê.",
  "auth/unverified-email": "Email chưa được xác minh.",
  "auth/user-cancelled": "Người dùng đã hủy.",
  "auth/user-not-found": "Không tìm thấy người dùng.",
  "auth/user-disabled": "Tài khoản này đã bị vô hiệu hóa.",
  "auth/user-mismatch": "Người dùng không khớp.",
  "auth/user-signed-out": "Người dùng đã đăng xuất.",
  "auth/weak-password": "Mật khẩu quá yếu.",
  "auth/web-storage-unsupported": "Trình duyệt không hỗ trợ lưu trữ web.",
  "auth/already-initialized": "Đã được khởi tạo.",
  "auth/recaptcha-not-enabled": "reCAPTCHA chưa được kích hoạt.",
  "auth/missing-recaptcha-token": "Thiếu mã reCAPTCHA.",
  "auth/invalid-recaptcha-token": "Mã reCAPTCHA không hợp lệ.",
  "auth/invalid-recaptcha-action": "Hành động reCAPTCHA không hợp lệ.",
  "auth/missing-client-type": "Thiếu loại khách hàng.",
  "auth/missing-recaptcha-version": "Thiếu phiên bản reCAPTCHA.",
  "auth/invalid-recaptcha-version": "Phiên bản reCAPTCHA không hợp lệ.",
  "auth/invalid-req-type": "Loại yêu cầu không hợp lệ.",
};
