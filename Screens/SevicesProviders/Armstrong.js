import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import CheckBox from "@react-native-community/checkbox";

const Armstrong = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isChecked, setisChecked] = useState(false);
  return (
    <View style={styles.container}>
      {/*   tab with background image */}
      <TouchableOpacity style={{ margin: 10, borderRadius: 15 }}>
        <ImageBackground
          source={{
            uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcBAv/EAD0QAAEDAwIFAgIIBAUEAwAAAAEAAgMEBREGIRITMUFRYXEUIgcyQlKBkaGxFSMzwRYkU+HwF2Jy0SU0Q//EABoBAQADAQEBAAAAAAAAAAAAAAADBAUCAQb/xAAsEQACAgICAgICAgEDBQAAAAAAAQIDBBESIRMxIkEFURRhQiMycTRSgeHw/9oADAMBAAIRAxEAPwDtSAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgPgyMH1nAfivHJAc6L/UH5rznEDnRf6g/NOcf2Bzov8AUH5pziD1r2O+q4H8V6mn6B9L0BAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAat0rG262VNZJgthjc7HsF43pbOZy4xbKBBev4lEZ2ZY7i+dmc8JXz+T5E9lNXcvR9Gqk+8VW5THkPPipPvfqnKY8g+Lk8n817uf7HlMkVwmidxMkLXDocrqNlkXtMK1lssV5bXt5UxAqAO32lt4uT5VqXss12KXTJhXCUIAgCAIAgCAIAgCAIAgCAIAgCAIAgA36IChfSZd8QMtUDt34fNjt4H91Wvs18Shl3JfBFDttS+iqA5oHAdneyqWQU4lKMmizNkDwHA5DhkFZjjp6JuWz3K50ebPMr0bGU0NmSnqJKeZssTiHN3B9V3CTg+SOozcZbOiWuvjuNGydmATs9v3SvoKrVbDkjShNTW0balOwgCAIAgCAIAgCAIAgCAIAgCAIAgNC+XSK026SqkxkbMZ043dguLJ8VsjtsVcds45X1EtbUy1E7iZJHcRKz9tvbMWU3KW2ajgAjBJ2ir25Dz6tVa6v7R2mSuVVOz1AeIAgJfTVy/h9cGSn+TNhrs9B4Ku4d3jnxfpk1FvGWi/DHYrZNL2EAQBAEAQBAEAQBAEAQBAEAyMdUAQFd1tPU0VBBWUcz45IpdyOhBHQj8Aob3JR3Eq5cpQhyiUK9XqsuzYzVPyIx8rQNvUqi5ys9mbbdK3pmjDbqqpYXxQu4AccTtsn08qaumU+kjyFcpH3SWWpuFS+loXNllZ9fA+Vp8E9FdjgqC3YyzHHZrXOjqbDcGNqJKSplj+Z0DHZLR6+Far/H1WL+j11KJI2u4i4QOk4AxzXfM1uSG56LD/ACWC8WzS9MiZu5CzTwLwHySvTxnmc7HcL1b3tHmy+aUuXx1u5UrgZ4Dwuz1LexW3i2ucNM1MeznDROKyThAEAQBAEAQBAEAQBAEBBasvMtopYnU7W8yRxHE4Z4cKC+xwj0VMvI8MNmjpDU892qpKOrDeY1peHtGA7slNsp+yvg538huLLWpzTNa4MpZKSRlaWchww7jOy5kk1pnE1FpqRzp+lfg7fUV9xqRBSxcRBHUtzt+JXGPjpz7M+GLrtlctt3oWwTy3IvbAw4ipoXHmy57GQ7gecYW7KhwSUESwlFIk6nWswsr6exU1La4Wu4A1r8yEHwMfquY4qUvn2dOzrorVhtNTqC6chrnDjJdNO/J4R3JVq2yNMNEcYuT7LxRaHlo5qeW0XJ81PUY5gfHsG+Vk33LIhxsX/BI6N+jFW08lHUvgmGHNdhfJ2QcJNMqTi4y0YHHBwudEbPgro8C8Bt2yvmt1SJ6cjixgg9HBS1WyreySqxwe0dFttYK6hhqQ0tEjckeFuQlyima0Jcopm0ujoIAgCAIAgCAIB7IDzKA9KA0rtbKW7UjqasaSw7gtOC0+QuZQUl2RXUxuhxkVShFm0bdpoXyzSuma3hkdhxZv0OMY8qNOMGZtbxsGzi37LlJURRUrqhzhyms4ifTCl2ktmq5pLkc21dr+ISU0driZLK6MueJhkR7jt52VjEp/kPZWlap+im3bUFwuzXCrkaQ9wc4MyAcDAGM4x3WzXRCshlY30RP4fgpzkldP0lHWV8cddKd3gNjYwkPHnPbHsVBdKcVuJ3FJnQNIaZv1DbqqFlRTQRTOcGNlj4i5uMAnv64WbfkVzaf2WIVy0XCwWz+E2uGkknfUPaMOkf8AsPA9FUslzeyaK0aGrLcyqonVcbmiSEHiPYj/AGVDLo8keS9ogvr5LaKOsjXemZrPEPDzK90ebPNydh16L1Jv0c72+joulXVH8IjZUQvjMZLW8QxxDytrH5KHZsY++HZLqcnPD1wEB6gCAIAgCAID4meY4XyAZLWk4XjekeP0cwrdV3NtSZW1Lgc7MH1QPZZytsb2fP3fkpwlpF+03czd7RDWPbwPdkOA6ZG2y0IPaNnFud1SmzLeXytpYxE8xh8zGSPHVrScHHqvWSWt66KtrPSsDLfJX29r2zRDMgyXcbe5Oe6isgtbMv8AIYMZQ8kfaPNQ3GBulKJ8DnMNVGC6Np2wB836qO2W4pImlYnTDj9o442Yz1tRMTuTt7L6XEr8VaR7rjHRlKtHGzxetaPUdD0TaKQ2hlxNorKm4Ryl9O7drT4+bI2WXlWPnwT6LNcfjs3LjetW24OqbxTinp3ycLREWngGM52ySR032K4jXTN6iz1ykvZ8f9QKe5WtlNcIqmnbLxMqKmn2c3BGHN9+46hHhyjLaZ75drTLRpGO01Vsnktr6uallcWPZVlxBI6nDvOVWuUuWpkkUmuiu321sttS5sUvMjzuD1ZnoFiZdLjLkvRnZFbi9ojqeCaqlEUEZfIfsjsq8KbH3x6IFByekaElY0Nn4N5YpDHy8blwOMKeWJOEkpfZDdygi626xGz01Hcqp/HWcxolZ9hod2Htnqr1dEYLaNGrHdcVN+y49B4Vg0SA1bfXWakiEQaZpiQ0u6ADqobpuK6KeZlLHS/sgLFqmudcYYaqQTRTPDT8u7c9wq1N83LUipj5znZxL8djj/hV81wgCAIAgCA8JwgK7cdGWquqHTESxOd1Eb8DPsonTFvZQu/HUWy5P2Rls1TTWusFnqY4oqamzEKhhyCR0JC8ViT0V6/yFdVngkul9mrrDU8s1RHQ2Z/NDwM8LCSXZ2wvLJv/ABOc7LmpKuou0Dvjbcx80bmGaIccbxggkbghTfXZqr516l+jkkjQ2ZlIXmRkRLQCdsZKzovdnf0zGpj8+P0im1lKaC7TU5+38zPBavr8eznFGjYh3Vkrlz+jbT1Leq2eeujMkMAHC0/Uc49iqGbdKCSRPTBSZ1+KKOGFsMTGsYxvC1rRgAeFkNtvbLi66PpzGvaQ9ocD1BGcouvQa2a8dBRxMLI6WFrC4u4QwYye665y/Z5xRp3B1TbQaukifUQN2npWDcN+8z1HjuvU1LpnnoitT3mw0lF8fPHBVVRjHJjx85z97wPddQo8suDObOPHs5La71VW67RXCKQmRj+ItcTgjuD6Y2Wy8WtV8Uvoox+L6JfT9VTSXw1MjS2mdViQsdvw5Od/YrF/JrVtf/BFYoysW/R1bVk3IscszI3S8DmOAYM9CD+Shk9LaL+Tbwqc0tmtadUC5UsksNuqXOYOjMFp2+8cBcQt5LeiOjMV0XJIiKy4UusJKa28l0EwkL+ZxA8DQN8eSemFH5Fb8SpZbTmtVP8A+0S1j0hQ2mqFTzZKiZv1DJjDPwHdSRpjF7LONgVUS37ZY1KXwgCAIAgPHENBLiAB1JOEDejBFW0k0nLiqonvB+q1wJXnJP0znkn0maOop5YKSJkbzEyaZsc0/wDpNOd/2GfVcyeiO+TUeiC1JoyjktrprXE6KrhaXNAcTzcb49z+65lWtbRQyvx0JV8ql37JTSVfFeLVBVPYw1cP8qRxaOIEeq6g9os4VkbalLXZm1ZdP4XaJHtP86T5I/crm6fGJLkWquGzk8UxNSx5OTxbnyVSrWpGTT/vR7erO24Fs7JDHNGNj2cPC3MbIcHo2Jw3ErL2lri09QcFbUXyRRfTJrSupKnT1dzYcy07/wCrETji9R6qLIoVq/skqnwZfnfShag0kUdWXePl3WcsCz9ljzxLDpvU9DqESCjbK2SJoMjXtxjPbPdV7aJVPTO4WKfom1CukSHhAzkpr9Hj0cl+kXUlLWyPtlsjZyxJxTzNaBzHDt6rWxMeS+bKltifSKLv3OT5V/7ICStRwx/qcL578zLdi0QW/s7Do66R3eymmmP86FvKkzuS3sVVpnyiaGNNWV8Wa2oRSaW03JS21pZJUyFrATklzhufyXU/hHogymsWhqta2R1t0qbfZv4pNM9lfC0Txhp2ZgZx+I2PuuI1KK5FbHwI01q1v5e//ReqeTnQxy8PDxsDiPGVMmbEW2tsyHbc9F6dDfr2QBAEAQFX17LPHb4Wx5EJeeaR38Aqrl8uPRSzZSjDo5zVVDmPDmPMb27hzTuFUqT3s+bsvkpfD2daimzp5k1dGZM0wdKw9XbbrS/x7Pqoy/0eU/0QmidQCvlnt7geGEcUJcckszs0+oXFc+XRTwMvzNw/Xo1Wy/4a1XUEvIo614e5mNhn7Q9j1915yUJd+jlP+NkP/tfZV9XX115uBkYf8vHlkTfTz+Kr2T5sjyLHZLogi/Bz17rnXZCvaM15vbKeha0AvkljI2OOHbGT/wA7LXw4eTs1q7NwKpRzY/lvI9CtuDIrI/ZuKUiCAs/0d1FZFqimjon5bLtKwnAc0D91Uy1F1bZLU+9Hbeu+fcLEL2zRvVyorXQST3GQMhPyHySewCkrhKUkonM2kjilRaKeCxSXV0hxUTGOjiGxxndx9MLZhZJy4FJpLtEJ0IA7nsrDaitkfrslKUcuEBfI5dnltbK8nsmLFdZrRXx1UB3+237ze4VeEuLFVjrlst8UrtTant9S9gFJA172RdcAYy53u7p7KzGflfRL/wBTkRl9In9WV9PT0cdJNKGGqkY12+4Zn5j7dlJOeui3lXRglF/bJV87BRPqKdzZGNjLmFm4dgbBd7+JYb1Dcf0cnluk9yk+InlcXu367N9vCybZTbZ86sqVr3v0XPQ1wqKgVFNK90jIgC0uJPD6K3iTlJaZrYFspxabLarhfCAIDHPBFUxviqGNkjds5rm5BXjSfs5lGMlqSIdmkrEx7ni3xkny5xx7ZK58cSr/AAMbe3E55XXKvtVXXU1LUzvpHPMRLvmaR0xnyqzcl19GFbbdXOST+PovOhrVR0NrFVTTmofUgOc8tAIOOg8KxVFKOzbwKIV17j3sjPpHqYxyI2tHOYD8+OgPZVcixOaicZuujnQ3JaeyiSKWjCT5XaR6zLQ6bq9SvmioGs5tPEZOJ3Q7/V9z/ZaGFe63r6LWJyfSKpNFLBPJFMx0U8buF7HdWlb0ZKS2iy/0bVPUZw15+Y9/KljLZFKGvRsrsjMtJUSUlVFUQkiSJwc3BxuFzOKlHTPY9PZ2Gj+kOyvtsM9ZPy6hzcvgAJLSsWWHZy6LnmikUDWerJtRVLY4OKKgj3ZG7q533itLGxvEtsrWWORWjI5zWsLncLBsC7ZvnAVlRW9kffolY7BXx2iO7ywFtI9/C0k7+hx4WXn5XxcYidbUOR8M67DC+dZURsN2AyudiRc9B1Zo60NkALJvlyf+eV7Rao28f2WcOepaJ3Wdhnu01JNTNhZys82V5x8mfHortlfLskzcTzuL3rRU6u9yx1Lqe019WynZ8jRJJkH1AGNlVlN70vRlTzHy4Vv4+i0/4CtzmRvFRUNkAHGWuGHFWPBHRoL8TR09ssNrtVJaoeVRswHbucTkuPkqSEFD0aNVMao6ibq7JQgCAIDSvTqhtrqvg2l1RyzwAdfdcy9EVrlwfH2R9mitVbZGUMTWSxhnDLG8YcHdye+crmPFrRFUqp18X2QVhLtK6jltNXO4UNT81M9/3s7BcxfGWmUsfeLf4m+n6GrqQuuMnOB4HgFrisrM5V28vos5MVJlLnts0MpLG8weV1G5NFLg49EdUQPiJD2lvuFNGSYaOrfR5Zxa7E2WRuJ6w8557gYw0fl+6v1rUdmnjV8IGtrnQVJqVhqaZ4pbk0bSgZbIPDx/fsrdORKt6+iWUdnDa6gqaCokhqoy1zHFhdjYkeCtKu6E/TINp9HzDVOZtJhwHqrCkcOGzaZUxPGx4fQrvZG4NGQEEZBGPddbOezNS081XMIqWJ80h+xG0k4XMpxj22epN/R0XSP0dScyOt1B9UfMyjzn24z/AGWZkZrkuMCzXT9s6HXUFNW0EtDNGORI3gLGjoO2PGFnNcl2TygpR0zi1Vaqijrp6NzS90Ly3i7Ox3WbZJRejHlHi2jahtxcWmV2MdlWd36OdbLNpygNVcYGsBDIjxuI7AdExa3ZYmWaIcpLRJ69us7Y6ey28A1FY7hfwncN8emVrWP/ABR7+QulpVQ9s9g0fbaGwz/Gta+oMRL53dWHHZeeNKJzD8fTXT2u/wBlgsM0k9lopZgQ90Lc57qSPov0NutbN9dEoQBAEA6oCgak1DUz1clPSvdFBG4t22c4+SfCzL75OXGJl5GTJvjEq76+opqps0EjmyA7Pad8/wB1zW2uzFnkzhP4eyz107NT6Nmq6lvBW0BJ4wMZcPHv+6vOXKG2atk/5eLzfUkTLKm26gt0FFHWMdXckPa3PzA43yubYQyIaLkLa74KCfZVZxLTyuhqI+CVhw4eFiTqcXxZVk3F6Zjc6N4xJg+4Xi5R9HnJG9TXy50rOCGpJYNg1/zAD0VqGXZFHSyLI+mbkOrrlH/Vjgl92kfsrEc9/aO1mTXtFcqpnSVklS2GM8b+MxSDiYT3C4hkzU+SKvlkpuSJe06Y0dqNrv8A474SsaMvihlLQfUY7LXpzpyXs06LI2r+zd/6U6byT/nMHtz1Y/l2EzrRs0f0Z6Ypjk0kkw8SzOIXjyrX9jxxMzL3ZbK51Lb7YY+WS08pjWD91m2Z0d97ZBLIhDrRp1WsK6UEU1NFD/3OJcVXlnP/ABRDLMk/SIupvNxqSOdWvA7tYeEfoq1mTbL7IXdY/bNAzNydsnuc9VBqUu2yJzPlpmqJo4YWFznnhbjypIVcno425S4o6NZ7cy0UDomuaah7OJ7s9XY2wtiqtVR/s2K4quP9la0VQPq7lUaguP1mFzGueer/ALR9AOn5pDt8mZ2FB2WSvsPNVagirwaGjJMDXBz39OPB6eyr5GR9RO8vJ5/GJns2rpRNHDcGs5RIaJGjHD7+i8pyvqRJRl76ZdBjctOQTsr5obPUPQgCAICj6h0pWPqnz23hmY8lxYXAEEqhZjNy3Ey8rDnJ7rIP/Bt8c4l8DW/KXbSA/gvVTNfRmP8AGZDltoi219XR0tTbJBwQyn+a3h3YR3XKb46K8bra4ypLXoWugZJHTU1oPE7aWsjdxAepJ6eysVP6Rrfj7YrUIw/8lg1PZvjqczwNHxDBuPvhcZVHkjtezRvp5rr2c/cOFxa4Ywcb9Qsri96Zjzai9GIyDoSQu+JG5n1zs91zxR6pguyUSDls+WSOgmZLA50b2nILeqkhKSfQjY4PaOh6d1DFcWNgnIbU9PR5/wDa06b1Pp+zaovVi79k3UyCGGR7jgNbnKmk9RbLEnpM5TVVBlnkkH2nErCa22zCsnuTNd8rvOAvVAhc2jHzRjuu+JypNn0Dk4buuWiT2y8aMsvKYLhUM+d39IHsO5WhiU6XN+zVxaOK5Mx63oLdxisqbpLRVJaA1rCXceP+1WLNa22QfkK6nqUpaZW6bUBptOSWdrXOkkc7+b0wwn91W8nGGkZ0cxQodMdmpFQ1nwbKz4aU0ziQJAM4xtv6KvKqTXI4rrs489dGSgoqm4ztgpYXOLjgkjZo8lcQplJ+iequc5pJHV4WcuKOPOeBgGfOAthLS0fQJaSRkXp6EAQBAPz9kA2229kPCn2e10N4guYrY43SSVb+44m42BVeCjJPZm1U13KSn7PdIieyV01juBOXnmUzj9V47geq7rXF6GEpY7dM/X0W/GOg27KXZp+ip6r06Zy+toWYf/8ApGB9bbqFTyMffyiUMrF5LkiiyRuY/hcD1wchUN/syJRal2gQAiaZ70eg5TQUjzBJAT0h0ya0paqyuuEdTHllPC/LpSeuOw8qzj1Sb5FzEpm5cl6Lrqmo+HsszgccWGj8VayZcazSyZca2cxJO+enZZSMJ9nw7cE+Oy6Rw9nkQBHTJPQLr2zuEW/RaNM6YnqZmVVbGY4B0a7YuVinHcntl/FxJb5SOgAAcLdgBtgLRS0tGqlroqn0hilbbopHQskrHPEdPt8w84UNyWjL/KcPEk1tv0Qb9LGhsPx9VJ/mQ5ruD7oJxgqJ06imVIfj/HUpy9/Z0KkiZHSxMjaGx8AAaBt0VpJJaNyEUopIyNY1oIYA0egXqSR0kkfSHoQBAEAQBAEBE1mm7TVyulfShkzjkvicWOJ9wueCK88Wqb212U7VNvFuuNO2mrKoiMcbBLJxFh9CqWTPxvoy8qhV2JxbIuorKmeXmy1EzpPvF5VPyyk/ZFO6x9tlv0Lep68T0VXIXyQ4dG8nctPUfgtLHsbWmXvx+U7Nwk+0TdxsduuR4qqmaZB0kb8rvzCllVGXtF+dUJ+0QtRoekfvBUyx/wDkA4KB4sPplWeDB+mQl50s+00hqzVskjDgC3hwd1Dbj8I72U7cHxR5bPrTunJLmRUVILKQfgZPb0XmPQ5ds7x8Vze36OgQQMpoWRQNEcbBhrGjYLRS0tGskktIidUW2outEyCmcwObJxEvONsFQ5FbsjpEGTVKyHGJXIND1rt5quFno0EqBYj12ylH8fL7ZI0+h6Nn/wBmpkk9GYapFixTJ44METdvsdut4zBSsDvvu+Z36qdVxX0WY0wj6RF6vvU1vEdPSP4JXjic7G7Wqvk3OHUSvl3OtaiVel1BdYJA/wCNkcO7X7hVI5M4veyhHJsj9m3R3Z1fqMV1XSOqZmRcNNDF0aepO6s13qyR1C12ZHKS3r0WN1tr7vI2S7yiGlDg5tJH3I6FxVni5ey/4526c+l+ie6YA6DoFIWktHqHoQBAEAQBAEAQBAV3VtmdXwCppm5niG7R9pqrZFPNbKmVR5I7XsoDoZzLymQSuk6cAYclZ8a5N+jFlXY3xSNp9nvFoY24uhdEI3B5IduPGVZUJwXIfxr6H5kdJslwZdbdFUs2c7ZzR9k9wr0JKa2b2Pcrq1JG8uicwVlHBXwmCoYHxkglp74XjimtM5lFSWmRl/vDbLSxthiBlfsxv2RhQ22qpdEGRcqY6RVYdWXdknG58b253YWAfqqSyp77KCzbE+y72e4xXO3x1UQ4eIkOaexHVaNc1OO0alVqshyRurskA2QGlda+O20b6mQ5I2YPJXFk+EdkV1irhtnNJDXV73VcrJpu5kLSQB4WVNTs+Riyc7O2jUL24LTuo9MhbfrRZNFUU89zbVNeWRQB3GMfXztjKuYlbXZfw6p+Tn6RfxstA1ggCAIAgCAIAgCAIAgCA+eFuc8Iz5wvNI80jWutMyqttRA/HC+NwOei8mtxZxdBTraZznT9zqbXXMp7dE+pdN8ksLnYaXdiD22VKmbi9IwMa+dM/HX2TNbqy82yuDLhR0rWYzyo35OPfypp3uL7Ratz7qZ/6iLFY79QXkf5V7hM0ZfE/Zzf/amhYpI0MfKrvW4lc16x3x9M8nLeVgDxuqWcvkinn+0VZ7sAqkkZ7aa7Lp9H0zfg6mnL8SczjDD4xjP6LTxX8eJq/j5fDRnuOtKKjq5IBTzTCI4c9hGM98KSd6i9Htv5CuuXFoy2/WNqrC5r3SU7sZHNGM/iEjfBndOdTb6K1qu9fxOfggeRTw/UGP6h8qrfZzfFGfmZHlfCJd7FTCls1JAQNohxDHc7/wB1crjqCRr0wUa0jKbZQmTmfB0/H97ljK64R/R74ob3o2WMZG3hY0NHgDC6S16O0kvR9IehAEAQBAEAQBAEAQBAEAQGtconzW+ojjzxPjLWjyVzNbi0jiabi0jlcbKuxTRVz4CyZz3FjZB42BWfqdbR8242Y0ueuyx6TtEt1NXXXuIy84jl8zYnyR+eFZhWpdzRewaZ3crb17J3/C9FA/m298lHP2kjeT+BBUnhS/29F/8Ah1x7h0aVZQNpW1NbqGqin4mcuA4x+nlQyr0m7GR2QUU52vZBm2W6ltNBdZ3SOZM8CSMnYDJ7fgolVCMFIpuuqFaufplknt9LfKSnr7LUfDv4eFkrG4HD3BCsuCmk4l1Qrvip1vR7/g+2OYwPdOWtGCGyEBx7k+698S++wsGr3LsjtRxu038JNaKSLkEkTcbeLj9CT0XE9VdpEGVvGSlVFFUuUj7pUy10FO5jQWl8bN+EnZVW+cm4ozLlO9uUEdStLJI7ZSMm/qCJod74WjDfFbPo6t8Fs210SBAEAQBAEAQBAEAQBAEAQBAEAQGGelp6gtdPAyUtPylwzheNJ+zmUYy9oygbL06PUBW9b2+Wtt8ckLXPEJJcxo6j2VXKg5Q6KOdS7K+itSCSXR8MQY9xFW8Dh36/7qJ7dWvspThKWNw0W3RtumtlijhqdpHudJw+AT0/T9VbqTUFsv4FEqKVGROKQuGOeCOojMU8bZI3bFrui8aTWmeOKktNGpb7PQ258j6WEML8B3fYLmNcYeiKqiuvfFG/7rsmCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAID5DG8OAxo3zgBDzij0Db+yHp6gCAIAgCAIAgCAIAgCAID//2Q==",
          }}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 15 }} // Apply border radius to the image
        >
          <LinearGradient
            colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)"]}
            style={styles.gradientContainer}
            start={{ x: 0.5, y: 1 }} // Starting from bottom
            end={{ x: 0.5, y: 0 }} // Ending at the top
          >
            <View style={styles.tabContentContainer}>
              <Text style={styles.tabText}>Armstrong Global Solutions</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>

      <ScrollView style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            width: "100%",

            marginVertical: 15,

            alignItems: "center",
            backgroundColor: "white",

            padding: 16,
          }}
        >
          <Text>Service Regiestration</Text>
          <View
            style={{
              width: "100%",
              padding: 15,
              justifyContent: "center",
              backgroundColor: "whitesmoke",
              height: 50,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <TextInput placeholder="Enter your full names..." />
          </View>
          <View
            style={{
              width: "100%",
              padding: 15,
              justifyContent: "center",
              backgroundColor: "whitesmoke",
              height: 50,
              borderRadius: 10,
              marginVertical: 5,
            }}
          >
            <TextInput placeholder="Enter your phone number +256" />
          </View>
          <RNPickerSelect
            placeholder={{ label: "Register as", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Individual", value: "me" },
              { label: "Business", value: "them" },
              { label: "Organization", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />
          <RNPickerSelect
            placeholder={{ label: "Pickup Schedule", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Weed Days", value: "option1" },
              { label: "Weekends", value: "option2" },

              // { label: "Organization", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />
          <RNPickerSelect
            placeholder={{ label: "Region", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Central", value: "me" },
              { label: "East", value: "them" },
              { label: "West", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />
          <RNPickerSelect
            placeholder={{ label: "District", value: null }}
            onValueChange={(value) => setSelectedValue(value)}
            items={[
              { label: "Central", value: "me" },
              { label: "East", value: "them" },
              { label: "West", value: "we" },
            ]}
            style={{
              inputAndroid: {
                backgroundColor: "whitesmoke",
                marginVertical: 10,

                borderRadius: 16,
                width: "100%",
              },
            }}
          />

          <TouchableOpacity
            style={{
              width: "40%",
              padding: 10,
              borderRadius: 15,
              backgroundColor: "teal",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Register</Text>
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              padding: 15,

              marginVertical: 16,
              backgroundColor: "whitesmoke",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Note</Text>
            <Text>
              We are not able to provide services to some districts {"\n"}{" "}
              {"\n"}Management
            </Text>
          </View>
          {/* Support and help */}
          <View
            style={{
              width: "100%",
              padding: 15,

              marginVertical: 16,
              backgroundColor: "whitesmoke",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Support and CustomerCare
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 10,
                backgroundColor: "white",
                padding: 15,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <FontAwesome
                style={{ marginHorizontal: 10, flex: 1 }}
                name="phone"
                size={24}
                color="black"
              />
              <Text style={{ alignSelf: "flex-end" }}>(+91) 9999-241-423</Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 4,
                backgroundColor: "white",
                padding: 15,
              }}
            >
              <FontAwesome
                style={{ marginHorizontal: 10, flex: 1 }}
                name="whatsapp"
                size={24}
                color="black"
              />
              <Text style={{ alignSelf: "flex-end" }}>(+91) 9999-241-423</Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 4,
                backgroundColor: "white",
                padding: 15,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <FontAwesome
                style={{ marginHorizontal: 10, flex: 1 }}
                name="envelope"
                size={24}
                color="black"
              />
              <Text style={{ alignSelf: "flex-end" }}>
                armstrong.help@gmail.co.ug
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Armstrong;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "whitesmoke" },
  gradientContainer: {
    width: "100%",
    height: 260,

    alignItems: "center",
    borderRadius: 10,
  },
  backgroundImage: {
    width: "100%",
    height: 260,
  },
  tabContentContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end", // Align content to the bottom
    paddingBottom: 20, // Add padding to avoid text touching the bottom edge
  },
  tabText: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
  },
});
