import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";

export default ({ title, date, setDate, style, testID }) => {
  const [open, setOpen] = useState(false);
  const [dateLabel, setDateLabel] = useState(date.toLocaleDateString());

  return (
    <>
      <TouchableOpacity
        style={style}
        onPress={() => setOpen(true)}
        testID={testID}
      >
        <Text>
          {title} {dateLabel}
        </Text>
      </TouchableOpacity>

      {open && (
        <RNDateTimePicker
          value={date}
          onChange={(_, e) => {
            setOpen(false);
            if (!e) return;
            setDate(e);
            setDateLabel(e.toLocaleDateString());
          }}
          testID="RNDatePicker"
          maximumDate={new Date()}
        />
      )}
    </>
  );
};
