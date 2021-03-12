import React from "react";
import {HStack, NumberInput, Text} from "@chakra-ui/react";
import {NumberInputFieldTimer} from "./NumberInputFieldTimer";

export class TimerInput extends React.Component {
    render() {
        const max_dur = this.props.max_dur;

        const m10 = Math.floor(Math.floor(max_dur/60)/10);
        const m01 = Math.floor(max_dur/60)%10;

        const s10 = Math.floor((max_dur%60)/10);
        const s01 = (max_dur%60)%10;

        return (
            <HStack>
                <NumberInput
                    defaultValue={1} min={0} max={5} focusBorderColor="#1DB954"
                    value={m10}
                    onChange={(string, number)=>this.handleInputChange(number, m01, s10, s01)}
                >
                  <NumberInputFieldTimer/>
                </NumberInput>
                <NumberInput
                    defaultValue={0} min={0} max={9} focusBorderColor="#1DB954"
                    value={m01}
                    onChange={(string, number)=>this.handleInputChange(m10, number, s10, s01)}
                >
                  <NumberInputFieldTimer/>
                </NumberInput>
                <Text fontSize="6rem" color="White">:</Text>
                <NumberInput
                    defaultValue={0} min={0} max={5} focusBorderColor="#1DB954"
                    value={s10}
                    onChange={(string, number)=>this.handleInputChange(m10, m01, number, s01)}
                >
                  <NumberInputFieldTimer/>
                </NumberInput>
                <NumberInput
                    defaultValue={0} min={0} max={9} focusBorderColor="#1DB954"
                    value={s01}
                    onChange={(string, number)=>this.handleInputChange(m10, m01, s10, number)}
                >
                  <NumberInputFieldTimer/>
                </NumberInput>
            </HStack>
        );
    }

    handleInputChange(m10, m01, s10, s01) {
        this.props.onChange((m10*10 + m01) * 60 + (s10*10 + s01));
    }
}