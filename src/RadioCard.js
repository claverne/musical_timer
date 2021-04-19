import {Box, useRadio} from "@chakra-ui/react"

export function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" width="100%">
        <input {...input} />
        <Box
            {...checkbox}
            cursor="pointer"
            width="100%" pb="1rem" pt="1rem" pl="1rem"
            color="rgba(255,255,255,0.5)"
            textAlign="left"
            transition="0.05s linear all"
            _checked={{
                color: "White",
                fontWeight: "bold",
                borderColor: "#1DB954"
            }}
            _focus={{
                boxShadow: "outline",
            }}
            _hover={{
                fontWeight: "bold",
                bg: "rgba(255,255,255,0.1)"
            }}
            _active={{
                color: "rgba(255,255,255,0.5)",
                fontWeight: "bold",
            }}
            >
            {props.children}
        </Box>

    </Box>
  )
}