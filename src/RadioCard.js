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
            width="100%" pb="1rem" pt="0.5rem"
            borderBottomWidth="1px"
            borderColor="rgba(255,255,255,0.5)"
            color="white"
            bgGradient="linear(to-t,rgba(29,185,84,0),rgba(29,185,84,0))"
            transition="0.05s linear all"
            _checked={{
                bgGradient: "linear(to-t,rgba(29,185,84,0.3),rgba(29,185,84,0.1), rgba(24,15,3,0))",
                color: "White",
                fontWeight: "bold",
                borderColor: "#1DB954"
            }}
            _focus={{
                boxShadow: "outline",
            }}
            _hover={{
                fontWeight: "bold",
            }}
            _active={{
                color: "rgba(255,255,255,0.5)",
                fontWeight: "bold",
                bgGradient:"linear(to-t,rgba(29,185,84,0),rgba(29,185,84,0))",
            }}
            >
            {props.children}
        </Box>

    </Box>
  )
}