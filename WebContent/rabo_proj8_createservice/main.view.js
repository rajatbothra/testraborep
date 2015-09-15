sap.ui.jsview("rabo_proj8_createservice.main", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf rabo_proj8_createservice.main
	 */
	getControllerName: function() {
		return "rabo_proj8_createservice.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf rabo_proj8_createservice.main
	 */
	createContent: function(oController) {
		var oShell = new sap.ui.ux3.Shell();

		var oEntry = {};

		var uri = "/sap/opu/odata/sap/ZRABO_SER_CALL_BP_SRV";

		var oModel = new sap.ui.model.odata.ODataModel(uri, true);

		sap.ui.getCore().setModel(oModel);

		var oPanel1 = new sap.ui.commons.Panel("panel1", {
			text: "Enter General Data:"
		});
		var oLayout1 = new sap.ui.commons.layout.MatrixLayout();

		var oPanel2 = new sap.ui.commons.Panel("panel2", {
			text: "Enter Communication Data:"
		});
		var oLayout2 = new sap.ui.commons.layout.MatrixLayout();

		var oPanel3 = new sap.ui.commons.Panel("panel3", {
			text: "Enter Address Data:"
		});
		var oLayout3 = new sap.ui.commons.layout.MatrixLayout();

		var oLabel1 = new sap.ui.commons.Label({
			text: "Full Name:"
		});
		var oTextField1 = new sap.ui.commons.TextField({
			id: 'Field1',
			value: ''
		});

		var oLabel2 = new sap.ui.commons.Label({
			text: "Email:"
		});
		var oTextField2 = new sap.ui.commons.TextField({
			id: 'Field2',
			value: ''
		});

		var oLabel3 = new sap.ui.commons.Label({
			text: "City:"
		});
		var oTextField3 = new sap.ui.commons.TextField({
			id: 'Field3',
			value: ''
		});

		var oLabel4 = new sap.ui.commons.Label({
			text: "Street:"
		});
		var oTextField4 = new sap.ui.commons.TextField({
			id: 'Field4',
			value: ''
		});

		var oLabel5 = new sap.ui.commons.Label({
			text: "Country:"
		});
		var oTextField5 = new sap.ui.commons.TextField({
			id: 'Field5',
			value: ''
		});

		var oItemTemplate = new sap.ui.core.ListItem("template", {
			text: "{Landx}",
			key: "{Land1}"
		});
		var oSorter = new sap.ui.model.Sorter("Landx", false);
		var oKey = {};
		var oComboBox = new sap.ui.commons.ComboBox("ComboBox", {
			items: {
				path: "/CountrySet",
				template: oItemTemplate,
				sorter: oSorter
			},
			change: function(oEvent) {
				oKey = oEvent.oSource.getSelectedKey();
			}
		});

		function update() {
			oEntry.CompanyName = oTextField1.getValue();
			oEntry.EmailAddress = oTextField2.getValue();
			oEntry.Country = oKey;
			oEntry.City = oTextField3.getValue();
			oEntry.Street = oTextField4.getValue();

			oModel.create("/BusinessPartners", oEntry, null, function() {
					//	alert("Create successful");
				},
				function() {
					//			alert("Create failed");
				});
		}

		var oButton = new sap.ui.commons.Button("btn", {
			text: "Submit",
			press: update
		});

		oModel.setSizeLimit(500);
		oComboBox.setModel(oModel);
		oComboBox.bindItems("/CountrySet", oItemTemplate);
		oLayout1.createRow(oLabel1, oTextField1);

		oLayout2.createRow(oLabel2, oTextField2);

		oLayout3.createRow(oLabel3, oTextField3);
		oLayout3.createRow(oLabel4, oTextField4);

		oLayout3.createRow(oLabel5, oComboBox);

		oLayout3.createRow(null, oButton);

		oPanel1.addContent(oLayout1);
		oPanel2.addContent(oLayout2);
		oPanel3.addContent(oLayout3);

		oShell.addContent(oPanel1);
		oShell.addContent(oPanel2);
		oShell.addContent(oPanel3);

		return oShell;
	}

});