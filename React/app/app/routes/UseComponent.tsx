import { Button } from "~/components/Button";

export default function UseComponent() {
    return (
        <>
            <div><Button label="Button 1" /></div>
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                <Button label="Button 2" backgroundColor="red">
                    <i className="fa fa-check"></i>
                    <span>Save Now</span>
                </Button>
            </div>
        </>
    )
}