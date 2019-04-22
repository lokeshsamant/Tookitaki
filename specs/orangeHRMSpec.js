import {browser, element} from "protractor";

describe('Test Orang HRM portal', ()=> {

    it('TS_PIM_01- Should be able to enter the Orange HRM system with a successful ESS-User account', () => {

        browser.get("https://opensource-demo.orangehrmlive.com/");
        browser.sleep(1000);
        element(by.id("txtUsername")).sendKeys("Admin");
        element(by.id("txtPassword")).sendKeys("admin123");
        element(by.xpath(".//*[@name='Submit']")).click();
        browser.sleep(2000);
        element(by.id("spanMessage")).isPresent().then(function (ispresent) {
            if(ispresent == true)
            {
                element(by.id("spanMessage")).getText().then(function (errorMessage) {
                    console.log(errorMessage);
                });
            }
        });
        expect(browser.getCurrentUrl()).toEqual("https://opensource-demo.orangehrmlive.com/index.php/dashboard");
        browser.sleep(2000);
    });

    it('TS_PIM_02 - Should be able to see the “General Information” in organization tab under admin on logging in the first time',() => {

         browser.actions().mouseMove(element(by.id("menu_admin_viewAdminModule"))).perform();
         browser.actions().mouseMove(element(by.id("menu_admin_Organization"))).perform();
         element(by.xpath("//a[contains(text(),'General Information')]")).click();
         browser.getCurrentUrl().then(function(url){
            if(url === "https://opensource-demo.orangehrmlive.com/index.php/admin/viewOrganizationGeneralInformation" )
            {
                console.log("       Successfully redirected to General Information Page");
                expect(url).toEqual("https://opensource-demo.orangehrmlive.com/index.php/admin/viewOrganizationGeneralInformation");
            }
            else
            {
                console.log("       Not redirected to General Information Page");
                expect(url).toEqual("https://opensource-demo.orangehrmlive.com/index.php/dashboard");
            }
         });
        browser.sleep(2000);
    });

    it('TS_PIM_03 - Should be able to edit the fields and save changes in Contact details', () => {

        //Edit the details
        element(by.xpath(".//*[@name='btnSaveGenInfo']")).click();
        browser.sleep(1000);
        //Replace new details
        element(by.xpath(".//*[@name='organization[name]']")).clear();
        element(by.xpath(".//*[@name='organization[name]']")).sendKeys("Test OrangeHRM (Pvt) Ltd");
        element(by.xpath(".//*[@name='organization[taxId]']")).clear();
        element(by.xpath(".//*[@name='organization[taxId]']")).sendKeys("Test 123456");
        element(by.xpath(".//*[@name='organization[registraionNumber]']")).clear();
        element(by.xpath(".//*[@name='organization[registraionNumber]']")).sendKeys("Test A23456");
        element(by.xpath(".//*[@name='organization[fax]']")).sendKeys("22-04-2019");
        element(by.xpath(".//*[@name='organization[note]']")).clear();
        element(by.xpath(".//*[@name='organization[note]']")).sendKeys("Test HRM Software");
        //save details
        browser.sleep(1000);
        element(by.xpath(".//*[@name='btnSaveGenInfo']")).click();
        browser.sleep(1000);

        expect(browser.getCurrentUrl()).toEqual("https://opensource-demo.orangehrmlive.com/index.php/admin/viewOrganizationGeneralInformation");
    });

    it('TS_PIM_04 - Should be able to Add new Employee under PIM, Employee list', () => {

        browser.actions().mouseMove(element(by.id("menu_pim_viewPimModule"))).perform();
        browser.actions().mouseMove(element(by.id("menu_pim_addEmployee"))).click().perform();

        element(by.xpath(".//*[@name='firstName']")).sendKeys("test");
        element(by.xpath(".//*[@name='lastName']")).sendKeys("case 4");
        browser.sleep(1000);
        element(by.xpath(".//*[@value='Save']")).click();
        browser.sleep(1000);

        expect(browser.getCurrentUrl()).toContain("https://opensource-demo.orangehrmlive.com/index.php/pim/viewPersonalDetails/empNumber/");
    });

    it('TS_PIM_05 - Should be able to upload a picture format', () => {

        var path = require('path');
        var fileToUpload = '../Profile_picture/images.png',
            absolutePath = path.resolve(__dirname, fileToUpload);

        element(by.id("empPic")).click();
        element(by.id("photofile")).sendKeys(absolutePath);
        element(by.id("btnSave")).click();
        browser.sleep(2000);

        expect(browser.getCurrentUrl()).toContain("https://opensource-demo.orangehrmlive.com/index.php/pim/viewPhotograph/empNumber/");
    });

    it('TS_PIM_06 - Should be able to Mouse over on Employee Distribution by subunit graph', () => {


        browser.actions().mouseMove(element(by.id("menu_dashboard_index"))).click().perform();
        browser.sleep(3000);
        browser.actions().mouseMove(element(by.id("dashboard__employeeDistribution"))).perform();
        expect(browser.getCurrentUrl()).toContain("https://opensource-demo.orangehrmlive.com/index.php/dashboard");
    });

}) ;