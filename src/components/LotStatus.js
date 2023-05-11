import React, { useState, useEffect } from "react";
import axios from "axios";
import port from "../port";

const LotStatus = () => {
	const [lots, setLots] = useState([
		{ name: "B1", status: "", reportTime: "" },
		{ name: "B6", status: "", reportTime: "" },
		{ name: "E6", status: "", reportTime: "" },
		{ name: "F5", status: "", reportTime: "" },
		{ name: "F10", status: "", reportTime: "" },
		{ name: "G3", status: "", reportTime: "" },
		{ name: "G12", status: "", reportTime: "" },
	]);

	useEffect(() => {
		axios
			.get(port + "/loadLotStatus")
			.then((response) => {
				const lotData = response.data;
				setLots(lotData);
			})
			.catch((error) => console.log(error));
	}, []);

	const handleReport = (index, status) => {
		const newLots = [...lots];
		const currentTime = new Date().toLocaleString();
		newLots[index].status = status;
		newLots[index].reportTime = currentTime;
		setLots(newLots);

		// Send POST request to save data
		const lotData = {
			lotId: newLots[index].name,
			status,
			reportTime: currentTime,
		};
		axios
			.post(port + "/saveLotStatus", lotData)
			.then((response) => console.log(response))
			.catch((error) => console.log(error));
	};

	return (
		<div className="table-responsive">
			<h3 className="text-center mb-2">Lot Status</h3>
			<p>
				Ever go to a lot while late to class and realize it's full after
				spinning around for several minutes? Help a fellow student and report on
				the current status of a lot so they (and you) know in advance next time!
			</p>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>Lot Name</th>
						<th>Status</th>
						<th>Report Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{lots.map((lot, index) => (
						<tr key={lot.name}>
							<td>{lot.name}</td>
							<td>{lot.status}</td>
							<td>{lot.reportTime}</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => handleReport(index, "Full")}
								>
									Full
								</button>
								<button
									className="btn btn-warning"
									onClick={() => handleReport(index, "Almost Full")}
								>
									Almost Full
								</button>
								<button
									className="btn btn-success"
									onClick={() => handleReport(index, "OK")}
								>
									OK
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default LotStatus;
