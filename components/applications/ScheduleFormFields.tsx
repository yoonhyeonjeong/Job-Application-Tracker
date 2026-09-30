import { DatePicker, Form, Input, Select } from "antd";
import { ScheduleOption } from "@/utils/format";

export const ScheduleFormFields = () => {
  return (
    <>
      <Form.Item
        name="scheduleType"
        label="일정 유형"
        rules={[
          {
            required: true,
            message: "일정 유형을 선택해주세요.",
          },
        ]}
      >
        <Select placeholder="일정 유형 선택" options={ScheduleOption} />
      </Form.Item>

      <Form.Item
        name="title"
        label="일정 제목"
        rules={[
          {
            required: true,
            message: "일정 제목을 입력해주세요.",
          },
        ]}
      >
        <Input placeholder="예: 1차 기술 면접" />
      </Form.Item>

      <Form.Item
        name="scheduledAt"
        label="일정 일시"
        rules={[
          {
            required: true,
            message: "일정 일시를 선택해주세요.",
          },
        ]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm" placeholder="날짜와 시간 선택" className="full-width" />
      </Form.Item>

      <Form.Item name="memo" label="메모">
        <Input.TextArea rows={4} maxLength={500} showCount placeholder="메모 입력" />
      </Form.Item>
    </>
  );
};
